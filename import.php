<?php
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$ch = curl_init();
curl_setopt($ch, CURLOPT_COOKIEJAR, "/tmp/cookies");
curl_setopt($ch, CURLOPT_URL, "https://chalk.uchicago.edu/webapps/login/");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "user_id={$request->cnet}&password={$request->password}&login=Login&action=login&new_loc=");

ob_start();      // prevent any output
curl_exec ($ch); // execute the curl command
ob_end_clean();  // stop preventing output

curl_close ($ch);
unset($ch);

$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_COOKIEFILE, "/tmp/cookies");
curl_setopt($ch, CURLOPT_URL, "https://chalk.uchicago.edu/webapps/portal/execute/tabs/tabAction?tab_tab_group_id=_1_1&forwardUrl=edit_module%2F_25_1%2Fbbcourseorg%3Fcmd%3Dedit&recallUrl=%2Fwebapps%2Fportal%2Fexecute%2Ftabs%2FtabAction%3Ftab_tab_group_id%3D_1_1");

$buf2 = curl_exec ($ch);

curl_close ($ch);

preg_match_all('/\w{4} \d{5}/', $buf2, $matches, PREG_OFFSET_CAPTURE);

$out = array();
foreach($matches[0] as $match) {
	array_push($out, $match[0]);
}
echo implode('|', array_unique($out));
