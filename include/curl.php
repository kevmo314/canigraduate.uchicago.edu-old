<?php
function get($url, $cookie_file=false, $proxy=false) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	if($cookie_file !== false) {
		curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file);
		curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);
	}
	curl_setopt($ch, CURLOPT_USERAGENT, 'CanIGraduate/1.0');
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	if($proxy !== false) {
		curl_setopt($ch, CURLOPT_PROXY, $proxy);
	}
	$buffer = curl_exec($ch);
	curl_close($ch);
	return $buffer;
}
function post($url, $data, $cookie_file=false, $proxy=false) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	if($cookie_file !== false) {
		curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file);
		curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);
	}
	curl_setopt($ch, CURLOPT_USERAGENT, 'CanIGraduate/1.0');
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
	curl_setopt($ch, CURLINFO_HEADER_OUT, true);
	if($proxy !== false) {
		curl_setopt($ch, CURLOPT_PROXY, $proxy);
	}
	$buffer = curl_exec($ch);
	curl_close($ch);
	return $buffer;	
}
