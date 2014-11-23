<?php
// returns the grade distribution
include('../include/db.php');

$qry = $db->prepare('SELECT gpa, quarter_index, count FROM grade_quarter_index');
$result = $qry->execute();

$data = array();
while($values = $result->fetchArray(1)) {
	array_push($data, $values);
}
if(isset($_GET['format']) && $_GET['format'] == 'csv') {
	header('Content-Type: text/csv');
	$fp = fopen('php://output', 'w');
	fputcsv($fp, array('gpa', 'quarter_index', 'count'));
	foreach($data as $d) {
		fputcsv($fp, $d);
	}
	fclose($fp);
} else {
	header('Content-Type: application/json');
	echo json_encode($data);
}
