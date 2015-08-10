<?php
include('../include/curl.php');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$cookie_file = '/tmp/cookies' . rand();

if(!empty($request->cnetid)) {
	get('https://classes.uchicago.edu/loggedin/login.php', $cookie_file);
	$saml_intermediary = post('https://shibboleth2.uchicago.edu/idp/profile/SAML2/Redirect/SSO?execution=e1s1', array(
		'j_username' => $request->cnetid,
		'j_password' => $request->password,
		'_eventId_proceed' => true
	), $cookie_file);
	preg_match_all('/name="(.+?)" value="(.+?)"/', $saml_intermediary, $matches);
	if(sizeof($matches[0]) < 2) {
		http_response_code(400);
		die('Authentication failed.');
	}
	post('https://classes.uchicago.edu/Shibboleth.sso/SAML2/POST', array(
		'RelayState' => html_entity_decode($matches[2][0]),
		'SAMLResponse' => html_entity_decode($matches[2][1])
	), $cookie_file);

	// authenticated, then "agree" to terms
	post('https://classes.uchicago.edu/loggedin/agreeToTerms.php', array(
		'submit' => 'I Agree' // lol
	), $cookie_file);
	sleep(0.5);

	$data = get('https://classes.uchicago.edu/courseDetail.php?courseName=' . urlencode($request->id),
		$cookie_file);
	preg_match_all('/td\>(\w{6} \d{4})\<\/td(?:.+?)\<td\>(.+?)\<\/(?:.+?)\<td\>(.+?)\<\/(?:.+?)id=(\d+?)"\>View/smi', $data, $matches);

	$out = array();
	foreach($matches[4] as $i => $id) {
		array_push($out, array(
			'id' => $id,
			'quarter' => $matches[1][$i],
			'section' => $matches[2][$i],
			'instructor' => $matches[3][$i]
		));
	}
} else {
	$exploded = explode(' ', $request->id);
	// fallback to the slightly less reliable general search
	$data = get("https://classes.uchicago.edu/searchEvaluations.php?EvalSearchType=option-number-search&CourseDepartment={$exploded[0]}&CourseNumber={$exploded[1]}&advancedSearch=SEARCH", $cookie_file);
	preg_match_all('/loggedin\/evaluation\.php\?id=(\d+)(?:.+?)' . $request->id . ' (.+?)\<\/a(?:.+?)loggedin\/evaluation(?:.+?)\<td\>(.+?)\<\/td\>(?:.+?)\<td\>(.+?)\<\/td\>/smi', $data, $matches);

	$out = array();
	foreach($matches[1] as $i => $id) {
		array_push($out, array(
			'id' => $id,
			'quarter' => $matches[4][$i],
			'section' => $matches[2][$i],
			'instructor' => $matches[3][$i]
		));
	}
}
echo json_encode($out);

unlink($cookie_file);
