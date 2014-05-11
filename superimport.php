<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

function get($url) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_COOKIEFILE, "/tmp/cookies");
	curl_setopt($ch, CURLOPT_COOKIEJAR, "/tmp/cookies");
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

	$buffer = curl_exec($ch);
	curl_close($ch);
	return $buffer;
}
function post($url, $data) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_COOKIEFILE, "/tmp/cookies");
	curl_setopt($ch, CURLOPT_COOKIEJAR, "/tmp/cookies");
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
	curl_setopt($ch, CURLINFO_HEADER_OUT, true);
	$buffer = curl_exec($ch);
	curl_close($ch);
	return $buffer;	
}

$db = new SQLite3('canigraduate.db');
$db->exec('CREATE TABLE IF NOT EXISTS distribution (signature CHAR(10) PRIMARY KEY, DM INTEGER DEFAULT 0, D INTEGER DEFAULT 0, DP INTEGER DEFAULT 0, CM INTEGER DEFAULT 0, C INTEGER DEFAULT 0, CP INTEGER DEFAULT 0, BM INTEGER DEFAULT 0, B INTEGER DEFAULT 0, BP INTEGER DEFAULT 0, AM INTEGER DEFAULT 0, A INTEGER DEFAULT 0);');
$db->exec('CREATE TABLE IF NOT EXISTS hashes (signature CHAR(32) PRIMARY KEY);');
$db->exec('CREATE TABLE IF NOT EXISTS edges (left CHAR(10), right CHAR(10), count INTEGER DEFAULT 0)');
function checkSignature($studentid, $class) {
	global $db;
	// check if we've stored this grade already into the distribution
	$hash = md5($studentid . " " . $class);
	return @$db->exec("INSERT INTO hashes (signature) VALUES('$hash')");
}
function storeGrade($class, $grade) {
	global $db;
	if(strlen($class) == 10) {
		$grade = str_replace(array('-', '+'), array('M', 'P'), $grade);
		if($grade[0] == 'A' || $grade[0] == 'B' || $grade[0] == 'C' || $grade[0] == 'D') {
			if(strlen($grade) > 2) {
				return;
			}
			$test = $db->prepare('SELECT * FROM distribution WHERE signature=:name;');
			$test->bindValue(':name', $class);
			$res = $test->execute();
			if($res->fetchArray(SQLITE3_ASSOC) == false) {
				$ins = $db->prepare('INSERT INTO distribution (signature) VALUES(:signature)');
				$ins->bindValue(':signature', $class);
				$ins->execute();
			}
			$update = $db->prepare("UPDATE distribution SET $grade=$grade+1 WHERE signature=:signature");
			$update->bindValue(':signature', $class);
			$update->execute();
		}
	}
}

unlink('/tmp/cookies');
get('https://my.uchicago.edu/Shibboleth.sso/Login?target=https://my.uchicago.edu/Login');
$saml_intermediary = post('https://shibboleth2.uchicago.edu/idp/Authn/UserPassword', array(
	'j_username' => $request->cnet,
	'j_password' => $request->password
));
preg_match_all('/name="(.+?)" value="(.+?)"/', $saml_intermediary, $matches);
post('https://my.uchicago.edu/Shibboleth.sso/SAML2/POST', array(
	'RelayState' => html_entity_decode($matches[2][0]),
	'SAMLResponse' => html_entity_decode($matches[2][1])
));

$buf2 = get('https://my.uchicago.edu/f/u21302l1s4/p/myCoursesAndGrades.u21302l1n15/max/render.uP?pCp');
preg_match_all('/td\>(\w{4} \d{5}).+?td.+?td.+?td.+?td.+?td.+?td\>(.+?)\</s', $buf2, $matches2);
preg_match('/ID Number: (\d{6})/', $buf2, $idmatch);
$out = array();
$new_vertices = array();
for($i = 0; $i < count($matches2[1]); $i++) {
	$signature = $matches2[1][$i];
	$grade = $matches2[2][$i];
	if(strlen($grade) > 2) {
		array_push($out, $matches2[1][$i]);
		continue;
	}
        if(!($grade[0] == 'A' || $grade[0] == 'B' || $grade[0] == 'C' || $grade[0] == 'D')) {
   		continue;
	}
	if(checkSignature($idmatch[1], $signature)) {
		array_push($new_vertices, $signature);
		storeGrade($signature, $grade);
	}
	array_push($out, $matches2[1][$i]);
}
$out = array_unique($out);
if(count($new_vertices) > 0) {
	$dbh = new PDO('sqlite:canigraduate.db');
	$dbh->beginTransaction();
	foreach($out as $left) {
		foreach($out as $right) {
			if($left != $right && (in_array($left, $new_vertices) || in_array($right, $new_vertices))) {
				$query = "INSERT INTO edges (left, right) VALUES('$left', '$right');";
				$dbh->query($query); // run the query
				$query = "UPDATE edges SET count=count+1 WHERE left='$left' AND right='$right'";
				$dbh->query($query);
			}
		}
	}
	$dbh->commit();
}
echo implode('|', $out);
