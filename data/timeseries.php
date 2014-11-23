<?php
include('../include/db.php');

$quarter = $_GET['quarter'];
$year = $_GET['year'];
if(!isset($quarter) || !isset($year)) {
	$qry = $db->prepare('SELECT * FROM year_distribution');
} else {
	$qry = $db->prepare('SELECT * FROM year_distribution WHERE quarter=:quarter AND year=:year');
	$qry->bindValue('quarter', $quarter);
	$qry->bindValue('year', $year);
}
$result = $qry->execute();

$data = new ArrayObject();
while($values = $result->fetchArray(1)) {
	$data[$values['quarter'] . ' ' . $values['year']] = array(
		'A' => $values['A'],
		'A-' => $values['AM'],
		'B+' => $values['BP'],
		'B' => $values['B'],
		'B-' => $values['BM'],
		'C+' => $values['CP'],
		'C' => $values['C'],
		'C-' => $values['CM'],
		'D+' => $values['DP'],
		'D' => $values['D']
	);
}

if($_GET['format'] == 'csv') {
	$fp = fopen('php://output', 'w');
	fputcsv($fp, array('Term', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D'));
	foreach($data as $class => $row) {
		fputcsv($fp, array_merge(array($class), array_values($row)));
	}
	fclose($fp);
} else {
	header('Content-Type: application/json');
	echo json_encode($data);
}
