<?php
include('../include/db.php');

$out = explode('|', $_GET['classes']);
$recommendations = array();
foreach($out as $left) {
	$qry = $db->prepare('SELECT right, count FROM edges WHERE left=:left;');
	$qry->bindValue(':left', $left);
	$res = $qry->execute();
	while($arr = $res->fetchArray(1)) {
		if(!in_array($arr['right'], $out) && $arr['right'][5] != '1') {
			if(!array_key_exists($arr['right'], $recommendations)) {
				$recommendations[$arr['right']] = 0;
			}
			$recommendations[$arr['right']] += $arr['count'];
		}
	}
}
arsort($recommendations);

$recommendations = array_intersect_key($recommendations, array_flip(array_slice(array_keys($recommendations), 0, 5)));

if(isset($_GET['format']) && $_GET['format'] == 'csv') {
	$fp = fopen('php://output', 'w');
	fputcsv($fp, array('Class', 'Weight'));
	foreach($recommendations as $class => $row) {
		fputcsv($fp, array($class, $row));
	}
	fclose($fp);
} else {
	header('Content-Type: application/json');
	if(count($recommendations) == 0) {
		echo "{}";
	} else {
		echo json_encode($recommendations);
	}
}
