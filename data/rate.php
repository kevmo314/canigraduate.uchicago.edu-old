<?php
include('../include/db.php');
include('../include/curl.php');

$request = json_decode(file_get_contents('php://input'));

// fetch the student id number from ldap
function getStudentID($request) {
	try {
		// sometimes students aren't in ldap. let's just hope that doesn't happen.
		$ldc = ldap_connect('ldaps://ldap.uchicago.edu/');
		$ldb = ldap_bind($ldc, 'uid=' . $request->cnetid . ',ou=people,dc=uchicago,dc=edu', $request->password);
		$lds = ldap_search($ldc, 'dc=uchicago,dc=edu', 'uid=' . $request->cnetid, array('ucStudentID'));	
		$lde = ldap_get_entries($ldc, $lds);
		return $lde[0]['ucstudentid'][0];
	} catch(Exception $e) {
		die('Authentication failed.');
	}
}
function getImportData($request) {
	// make a request to import my.uchi data
	$ch = curl_init();
	// TODO: find a better way to do this maybe
	curl_setopt($ch, CURLOPT_URL, 'https://canigraduate.uchicago.edu/superimport.php');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(array('cnet' => $request->cnetid, 'password' => $request->password)));
	$buffer = curl_exec($ch);
	curl_close($ch);
	return json_decode($buffer);
}
function addEvaluation($id, $rating, $gpa) {
	global $db;
	$db->exec("INSERT INTO evaluations(signature, gpa) VALUES ('$id', '$gpa')");
	$grades = array('', 'E', 'D', 'C', 'B', 'A');
	$grade = $grades[$rating];
	$db->exec("UPDATE evaluations SET $grade=$grade+1 WHERE signature='$id' AND gpa='$gpa'");
}
function addPrerequisite($id, $prerequisite) {
	// make sure it's a valid prereq
	if(strlen($prerequisite) != 10) { return; }
	$classes = file_get_contents('classes.json'); // do it the ghetto way
	if(strpos($classes, '"' . $prerequisite . '":') === false) { return; }
	incrementCounter('prerequisites', array(
		'signature' => $id,
		'prerequisite' => $prerequisite
	));
}
function addComment($id, $comment) {
	global $db;
	$qry = $db->prepare('INSERT INTO comments (signature, comment) VALUES(:id, :comment)');
	$qry->bindValue('id', $id);
	$qry->bindValue('comment', $comment);
	$qry->execute();
}
function classExists($request) {
	$data = getImportData($request);
	foreach($data->transcript as $row) {
		if($row->id == $request->id) {
			return $row;
		}
	}
	return false;
}
// why is this not RESTful? because fuck you that's why.
header('Content-Type: application/json');
if($request->action == 'get') {
	// ghetto sql injection protection
	$ids = preg_grep('/^[A-Z]{4} \d{5}$/', $request->id);
	$out = array();
	if(sizeof($ids) > 0) {
		foreach($ids as $id) {
			$out[$id] = array('ratings' => array(), 'prerequisites' => array(), 'comments' => array());
		}
		$where = '\'' . implode('\',\'', $ids) . '\'';
		$qry = $db->query('SELECT * FROM evaluations WHERE signature IN (' . $where . ')');
		while($result = $qry->fetchArray(SQLITE3_ASSOC)) {
			$out[$result['signature']]['ratings'][$result['gpa']] = array($result['E'], $result['D'], $result['C'], $result['B'], $result['A']);
		}
		$qry = $db->query('SELECT * FROM prerequisites WHERE signature IN (' . $where . ') ORDER BY count DESC');
		while($result = $qry->fetchArray(SQLITE3_ASSOC)) {
			array_push($out[$result['signature']]['prerequisites'], $result['prerequisite']);
		}
		$qry = $db->query('SELECT * FROM comments WHERE signature IN (' . $where . ')');
		while($result = $qry->fetchArray(SQLITE3_ASSOC)) {
			array_push($out[$result['signature']]['comments'], $result['comment']);
		}
	}
	echo json_encode($out);
} else if($request->action == 'check') {
	$sid = getStudentID($request);
	$out = array();
	foreach($request->id as $id) { // I mean sure you could put a fake id, but why would you want to?
		$hash = hashSignature($sid, $id);
		$qry = $db->prepare('SELECT * FROM evaluation_hashes WHERE signature=:signature');
		$qry->bindValue('signature', $hash);
		if($qry->execute()->fetchArray(1) !== false) { continue; }
		$qry = $db->prepare('SELECT * FROM hashes WHERE signature=:signature');
		$qry->bindValue('signature', $hash);
		if($qry->execute()->fetchArray(1) === false) { continue; }
		$out[] = $id;
	}
	echo json_encode($out);
} else if($request->action == 'rate') {
	$sid = getStudentID($request);
	if($data = classExists($request)) {
		$gpa = $data->gpa;
		$hash = hashSignature($sid, $request->id);
		$qry = $db->prepare('SELECT * FROM hashes WHERE signature=:signature');
		$qry->bindValue('signature', $hash);
		if($qry->execute()->fetchArray(1) !== false) {
			if(@$db->exec('INSERT INTO evaluation_hashes(signature) VALUES(\'' . $hash .'\')')) {
				if(!empty($request->rating)) {
					addEvaluation($request->id, $request->rating, $gpa);
				}
				foreach($request->prerequisites as $prerequisite) {
					addPrerequisite($request->id, $prerequisite);
				}
				if(!empty($request->comment)) {
					addComment($request->id, $request->comment);
				}
			}
		}
	}
} else if($request->action == 'ignore') {
	$sid = getStudentID($request);
	if(classExists($request)) {
		$hash = hashSignature($sid, $request->id);
		@$db->exec('INSERT INTO evaluation_hashes(signature) VALUES(\'' . $hash .'\')');
	}
}
