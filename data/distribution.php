<?php
// returns the grade distribution
include('../include/db.php');

$signature = $_GET['class'];
if(strlen($signature) != 10 || $signature[4] != ' ') {
	$qry = $db->prepare('SELECT * FROM distribution');
} else {
	$qry = $db->prepare('SELECT * FROM distribution WHERE signature=:name');
	$qry->bindValue('name', $signature);
}
$result = $qry->execute();

$data = new ArrayObject();
while($values = $result->fetchArray(1)) {
	if(!array_key_exists($values['signature'], $data) && is_numeric($values['gpa'])) {
		$data[$values['signature']] = array(
			'4' => 0, '3.7' => 0, '3.3' => 0, '3' => 0, '2.7' => 0,
			'2.3' => 0, '2' => 0, '1.7' => 0, '1.3' => 0, '1' => 0
		);
	}
	if(is_numeric($values['gpa']) && array_key_exists((string)$values['gpa'], $data[$values['signature']])) {
		$data[$values['signature']][(string)$values['gpa']] = $values['count'];
	}
}

if(isset($_GET['format']) && $_GET['format'] == 'csv') {
	header('Content-Type: text/csv');
	$fp = fopen('php://output', 'w');
	fputcsv($fp, array('Class', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D'));
	foreach($data as $class => $row) {
		fputcsv($fp, array_merge(array($class), array_values($row)));
	}
	fclose($fp);
} else {
	header('Content-Type: application/json');
	echo json_encode($data);
}
