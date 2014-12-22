<?php
include('../include/curl.php');

$proxy = '54.174.139.219:3128';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$cookie_file = '/tmp/cookies' . rand();

// wait until the tunnel is established, may take non-negligible time.
while(($page = post('https://classes.uchicago.edu/courseDetail.php?courseName=' . urlencode($request->id), array(
	'TermName' => $request->quarter
), $cookie_file, $proxy)) === false);
$matches = array();
// make the also haphazard assumption that all sections have the same additional notes. :v
preg_match('/Additional notes:\<\/strong\>(.+)/', $page, $matches);
if(sizeof($matches) > 1) {
	echo html_entity_decode(trim($matches[1]));
}
unlink($cookie_file);
