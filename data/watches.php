<?php
include('../include/db.php');
include('../include/curl.php');

function toTermOrdinal($quarter) {
  $split = explode(' ', $quarter);
  $year = intval($split[1]);
  $quarters = array('Winter','Spring','Summer','Autumn');
  return array_search($split[0], $quarters) + 4 * $year; // lol let's hope it works?
}

$request = json_decode(file_get_contents('php://input'));

// ugh, until we get proper authentication, do this stupid authentication method.
// note that ldap doesn't work because ldap auth isn't as reliable. apparently. >.>
$cookie_file = '/tmp/cookie-this-is-really-stupid';
get('https://my.uchicago.edu/Shibboleth.sso/Login?target=https://my.uchicago.edu/Login', $cookie_file);
$saml_intermediary = post('https://shibboleth2.uchicago.edu/idp/profile/SAML2/Redirect/SSO?execution=e1s1', array(
	'j_username' => $request->cnetid,
	'j_password' => $request->password,
	'_eventId_proceed' => true
), $cookie_file);
preg_match_all('/name="(.+?)" value="(.+?)"/', $saml_intermediary, $matches);
unlink($cookie_file);
if(sizeof($matches[0]) == 0) {
	http_response_code(400);
	die('Authentication failed.');
}

// back to the normal stuff

// why is this not RESTful? because fuck you that's why.

if(property_exists($request, 'action') && ($request->action == 'add' || $request->action == 'remove')) {
	if($request->action == 'add') {
		$qry = $db->prepare('INSERT INTO watches (email, quarter, quarter_id, course, section, activity) VALUES (:email, :quarter, :qid, :course, :section, :activity)');
		$qry->bindValue('quarter', $request->quarter);
		$qry->bindValue('qid', toTermOrdinal($request->quarter));
		$qry->bindValue('course', $request->course);
		$qry->bindValue('section', $request->section);
		$qry->bindValue('activity', @$request->activity);
	} else {
		$qry = $db->prepare('DELETE FROM watches WHERE email=:email AND id=:id');
		$qry->bindValue('id', $request->id);
	}	
	$qry->bindValue('email', $request->cnetid . '@uchicago.edu');
	$qry->execute();
}
$qry = $db->prepare('SELECT id, quarter, course, section, activity FROM watches WHERE email=:email');
$qry->bindValue('email', $request->cnetid . '@uchicago.edu');
$result = $qry->execute();
$out = array();
while($values = $result->fetchArray(1)) {
	array_push($out, $values);
}
if(isset($_GET['format']) && $_GET['format'] == 'csv') {
	// lol
} else {
	header('Content-Type: application/json');
	echo json_encode($out);
}
