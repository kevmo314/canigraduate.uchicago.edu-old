<?php
include('../include/curl.php');
include('../include/cnetid.php');

function findErrors($content, $course) {
	preg_match_all('/div class="messages (.+?)"(?:.+?)\<p\>(.+?)\<\/p/ism', $content, $matches);
	$errors = array();
	for($i = 0; $i < sizeof($matches[0]); $i++) {
		array_push($errors, array($matches[1][$i], str_ireplace('this course', $course, $matches[2][$i])));
	}
	return $errors;
}

$proxy = '54.183.147.66:3128';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$request->cnetid = $configid['cnetid'];
$request->password = $configid['cnetpassword'];

$cookie_file = '/tmp/cookies' . rand();

// wait until the tunnel is established, may take non-negligible time.
while(get('https://classes.uchicago.edu/', $cookie_file, $proxy) === false);

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
// get current registrations
$errors = array();
if(empty($request->quarter)) {
	sleep(0.6);
	$buffer = get('https://classes.uchicago.edu/loggedin/myCourses.php', $cookie_file, $proxy);
} else {
	if(!empty($request->drop)) {
		// drop if requested
		$buffer = post('https://classes.uchicago.edu/loggedin/myCourses.php', array(
			'TermName' => $request->quarter
		), $cookie_file, $proxy);
		foreach($request->drop as $drop) {
			// determine course section, activity, units
			sleep(0.6);
			preg_match('/confirmEnrollment\.php\?CourseName=' . preg_quote(urlencode($drop->id)) . '&amp;SectionName=' . preg_quote(urlencode($drop->section)) . '&amp;ActivityName=' . preg_quote(urlencode($drop->activity)) . '&amp;Units=(\S*)&amp;E/', $buffer, $matches);
			if(sizeof($matches) > 0) {
				sleep(0.6);
				$errors = array_merge($errors, findErrors(
					post('https://classes.uchicago.edu/loggedin/register/processEnrollment.php', array(
						'CourseName' => $drop->id,
						'EnrollmentStatus' => 'Dropped - cmore', // what the fuck?
						'SectionName' => $drop->section,
						'ActivityName' => $drop->activity,
						'Units' => $matches[1],
						'TermName' => $request->quarter
					), $cookie_file, $proxy), $drop->id));
			}
		}
	}
	if(!empty($request->add)) {
		foreach($request->add as $add) {
			sleep(0.6);
			$errors = array_merge($errors, findErrors(
				post('https://classes.uchicago.edu/loggedin/register/processEnrollment.php', array(
					'CourseName' => $add->id,
					'EnrollmentStatus' => 'Registered - cmore', // what the fuck?
					'SectionName' => $add->section,
					'ActivityName' => $add->activity,
					'Units' => 100, // JUST GUESS :v
					'TermName' => $request->quarter
				), $cookie_file, $proxy), $add->id));
		}
	}
	sleep(0.6);
	$buffer = post('https://classes.uchicago.edu/loggedin/myCourses.php', array(
		'TermName' => $request->quarter
	), $cookie_file, $proxy);
}

$dom = new DOMDocument();
$dom->preserveWhiteSpace = false;
$dom->loadHTML($buffer);
foreach((new DOMXPath($dom))->query('//comment()') as $comment) {
	$comment->parentNode->removeChild($comment);
}
$rows = $dom->getElementsByTagName('tr');
$data = array();
foreach($rows as $row) {
	if($row->getAttribute('class') == 'section first') {
		$activity = '';
		try {
			$twoAway = $row->nextSibling->nextSibling;
			if($twoAway != null && $twoAway->getAttribute('class') == 'activity') {
				preg_match('/Activity (\S*)/', $twoAway->getElementsByTagName('div')->item(0)->textContent, $matches);
				$activity = trim($matches[1]);
			}
		} catch(Exception $e) {
			// do nothing!
		}
		$data[trim($row->firstChild->textContent)] = $activity;
	}
}

$out = array();
foreach($data as $left => $activity) {
	$s = explode('/', $left);
	array_push($out, array('id' => $s[0], 'section' => $s[1], 'activity' => $activity));
}
echo json_encode(array('courses' => $out, 'messages' => $errors));
unlink($cookie_file);
