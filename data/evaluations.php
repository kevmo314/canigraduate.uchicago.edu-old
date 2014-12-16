<?php
include('../include/curl.php');

$proxy = '54.183.147.66:3128';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$cookie_file = '/tmp/cookies' . rand();

// wait until the tunnel is established, may take non-negligible time.
while(get('https://classes.uchicago.edu/', $cookie_file, $proxy) === false);

get('https://classes.uchicago.edu/loggedin/login.php', $cookie_file, $proxy);
$saml_intermediary = post('https://shibboleth2.uchicago.edu/idp/Authn/MCB', array(
	'performauthentication' => 'true',
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
sleep(0.5);

$data = get('https://classes.uchicago.edu/courseDetail.php?courseName=' . urlencode($request->id),
	$cookie_file, $proxy);
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
echo json_encode($out);

unlink($cookie_file);
