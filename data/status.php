<?php
$handle = curl_init('https://localhost:1820/');
curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, 0);
$response = curl_exec($handle);
$httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);
if($httpCode != 200) {
	http_response_code(500);
}
curl_close($handle);
