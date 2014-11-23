<?php
ob_start('ob_gzhandler');
include('../include/db.php');

if(!isset($_GET['left']) || !isset($_GET['right'])) {
	$qry = $db->prepare('SELECT * FROM edges ORDER BY left ASC, right ASC');
} else {
	$qry = $db->prepare('SELECT * FROM year_distribution WHERE left=:left AND right=:right ORDER BY left ASC, right ASC');
	$qry->bindValue('left', $_GET['left']);
	$qry->bindValue('right', $_GET['right']);
}
$result = $qry->execute();

$data = new ArrayObject();
while($values = $result->fetchArray(1)) {
	if(!array_key_exists($values['left'], $data)) {
		$data[$values['left']] = array();
	}
	$data[$values['left']][$values['right']] = $values['count'];
}
if($_GET['format'] == 'csv') {
	$fp = fopen('php://output', 'w');
	fputcsv($fp, array('Left', 'Right', 'Weight'));
	foreach($data as $left => $values) {
		foreach($values as $right => $count) {
			fputcsv($fp, array($left, $right, $count));
		}
	}
	fclose($fp);
} else {
	header('Content-Type: application/json');
	echo json_encode($data);
}
