<?php // create an index of the files in this directory ordered by quarter.
function toTermOrdinal($string) {
	$int = intval(substr($string, -4));
	$data = array('Winter' => 0, 'Spring' => 1, 'Summer' => 2, 'Autumn' => 3);
	return 4 * $int + $data[substr($string, 0, 6)];
}
$files = scandir('.');
$out = [];
foreach($files as $file) {
	if(strlen($file) > 4 && substr($file, -4) == 'json') {
		$quarter = substr($file, 0, 11);
		array_push($out, $quarter);
	}
}
$out = array_unique($out);
usort($out, function($a, $b) {
	return toTermOrdinal($b) - toTermOrdinal($a);
});
header('Content-Type: application/json');
echo json_encode($out);
