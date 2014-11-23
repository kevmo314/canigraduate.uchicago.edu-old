<?php
include('../include/curl.php');

$proxy = '54.183.147.66:3128';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$cookie_file = '/tmp/cookies' . rand();

// wait until the tunnel is established, may take non-negligible time.
while(get('https://classes.uchicago.edu/', $cookie_file, $proxy) === false);

get('https://classes.uchicago.edu/loggedin/login.php', $cookie_file, $proxy);
$saml_intermediary = post('https://shibboleth2.uchicago.edu/idp/Authn/UserPassword', array(
	'j_username' => $_POST['username'],
	'j_password' => $_POST['password']
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
header('Content-Type: text/calendar; charset=utf-8');
header('Content-Disposition: inline; filename=schedule.ics');
echo get('https://classes.uchicago.edu/loggedin/exportMyCourses.php', $cookie_file, $proxy);
unlink($cookie_file);
