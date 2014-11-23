<?php
$data = file_get_contents('http://registrar.uchicago.edu/page/building-abbreviations-addresses');
preg_match_all('/\<h2\>(.*?)\<\/h2\>(?:.*?)\<h3\>(.*?)\<\/h3/iusm', $data, $matches);
$buildings = array();
foreach($matches[1] as $index => $match) {
	$loc = strip_tags(trim($match));
	$buildings[$loc] = array('name' => trim($matches[2][$index]));
	if(preg_match('/https:(:?.*?)"/iusm', $match, $link_match) > 0) {
		$buildings[$loc]['link'] = 'https:' . $link_match[1];
	}
}
if(isset($_GET['format']) && $_GET['format'] == 'csv') {
	$fp = fopen('php://output', 'w');
	fputcsv($fp, array('Abbreviation', 'Name', 'Link'));
	foreach($buildings as $abbr => $data) {
		fputcsv($fp, array($abbr, $data['name'], $data['link']));
	}
	fclose($fp);
} else {
	echo json_encode($buildings);
}
