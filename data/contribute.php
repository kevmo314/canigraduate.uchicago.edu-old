<?php
//
// wouldn't need this shit if THE CLASSES API WAS FUNCTIONAL.
//
include('../include/curl.php');
include('../include/db.php');

function runUpdate($quarter, $id, $section, $activity, $new) {
	global $db;
	$results = $db->query("SELECT * FROM enrollment WHERE quarter='$quarter' AND id='$id' AND section='$section' AND activity='$activity'");
	$old = array(0, 0);
	while($row = $results->fetchArray()) {
		$old = array($row['enrolled'], $row['capacity']);
	}
	if($new[0] != $old[0] || $new[1] != $old[1]) {
		$db->query("INSERT OR REPLACE INTO enrollment (quarter, id, section, activity, enrolled, capacity) VALUES('$quarter', '$id', '$section', '$activity', '$new[0]', '$new[1]')");
		// DO NOTIFY, remove special cases.
		if($old[0] != 0 || $old[1] != 0) {
			exec("/var/www/canigraduate/scripts/Notify.py '$quarter' '$id' '$section' '$activity' $old[0] $old[1] $new[0] $new[1] &");
			echo "NOTIFY $quarter $id $section $activity $old[0] $old[1] $new[0] $new[1]\n";
		}
	} else {
		// NO NOTIFICATION
		echo "IGNORE $quarter $id $section $activity\n";
	}
}
function parseEnrollment($left, $right) {
	if(is_numeric($left)) {
		$left = intval($left);
	} else {
		$left = -1;
	}
	if(is_numeric($right)) {
		$right = intval($right);
	} else {
		$right = -1;
	}
	return array($left, $right);
}
function checkClass($quarter, $class, $cookie_file, $proxy) {
	sleep(1);
	$buffer = post('https://classes.uchicago.edu/courseDetail.php?courseName=' . urlencode($class), array(
		'TermName' => $quarter
	), $cookie_file, $proxy);
	preg_match_all('/div class="name"\>(?:\s+?)' . $class . '\/(\S+?)\s(?:.+?)enrolled"\>(.*?)\/(.*?)\s\</smi', $buffer, $matches, PREG_OFFSET_CAPTURE);
	for($j = 0; $j < sizeof($matches[0]); $j++) {
		$start_index = $matches[1][$j][1];
		$end_index = ($j + 1 < sizeof($matches[0]) ? $matches[1][$j + 1][1] : strlen($buffer));
		$context = substr($buffer, $start_index, $end_index - $start_index);
		preg_match_all('/div class="name"\>(?:\s+?)Activity (\S+?)\s(?:.+?)enrolled"\>(.*?)\/(.*?)\s\</smi', $context, $activity_matches);
		// produce parent node
		runUpdate($quarter, $class,
			$matches[1][$j][0], '', parseEnrollment($matches[2][$j][0], $matches[3][$j][0]));
		// produce activites
		for($k = 0; $k < sizeof($activity_matches[0]); $k++) {
			runUpdate($quarter, $class,
				$matches[1][$j][0], $activity_matches[1][$k], parseEnrollment($activity_matches[2][$k], $activity_matches[3][$k]));
		}
	}
}
$proxy = '54.183.147.66:3128';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$cookie_file = '/tmp/cookies' . rand();

// wait until the tunnel is established, may take non-negligible time.
while(($context = get('https://classes.uchicago.edu/', $cookie_file, $proxy)) === false);
// extract quarters
preg_match_all('/value="(\w{6} \d{4})"/', $context, $quarters);

get('https://classes.uchicago.edu/loggedin/login.php', $cookie_file, $proxy);
$saml_intermediary = post('https://shibboleth2.uchicago.edu/idp/Authn/UserPassword', array(
	'j_username' => $request->cnetid,
	'j_password' => $request->password
), $cookie_file, $proxy);
preg_match_all('/name="(.+?)" value="(.+?)"/', $saml_intermediary, $matches);
if(sizeof($matches[0]) == 0) {
	http_response_code(400);
	die('Authentication failed.');
}
post('https://classes.uchicago.edu/Shibboleth.sso/SAML2/POST', array(
	'RelayState' => html_entity_decode($matches[2][0]),
	'SAMLResponse' => html_entity_decode($matches[2][1])
), $cookie_file, $proxy);

// authenticated, then "agree" to terms
post('https://classes.uchicago.edu/loggedin/agreeToTerms.php', array(
	'submit' => 'I Agree' // lol
), $cookie_file, $proxy);
sleep(1);

// get the classes that are watched
$results = $db->query('SELECT quarter, course FROM watches WHERE quarter_id IN (SELECT MAX(quarter_id) FROM watches) AND course != "" AND course IS NOT NULL GROUP BY quarter, course;');
$data = array();
while($row = $results->fetchArray()) {
	array_push($data, $row);
}
$selected = array_rand($data, min(count($data), 5));
if(count($data) == 1) { // fuck php man
	$selected = array($selected);
}
// choose five to check
foreach($selected as $index) {
	checkClass($data[$index]['quarter'], $data[$index]['course'], $cookie_file, $proxy);
}
// for the remainder, rely on timeschedules.
unlink($cookie_file);
