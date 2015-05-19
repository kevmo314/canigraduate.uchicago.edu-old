<?php
include('../include/db.php');

$request = json_decode(file_get_contents('php://input'));

$query = $db->prepare('SELECT enrolled, capacity FROM enrollment WHERE quarter=:quarter AND id=:id AND section=:section AND activity=:activity AND updated > datetime("now", "-1 hour")');
$query->bindValue('quarter', $request->quarter);
$query->bindValue('id', $request->id);
$query->bindValue('section', $request->section);
$query->bindValue('activity', $request->activity);
if($results = $query->execute()->fetchArray(1)) {
	echo json_encode($results);
} else {
	echo '{}';
}
