<?php
include('../include/db.php');

$request = json_decode(file_get_contents('php://input'));

if(!empty($request->value)) {
	$qry = $db->prepare('INSERT OR REPLACE INTO storage(key, value) VALUES (:key, :value)');
	$qry->bindValue('key', $request->key);
	$qry->bindValue('value', $request->value);
	// timestamp conveniently calculated by INSERT OR REPLACE.
	// who's clever? THIS GUY.
	$qry->execute();
}
$db->prepare('DELETE FROM storage WHERE timestamp < datetime("now", "-1 week")')->execute();
$qry = $db->prepare('SELECT * FROM storage WHERE key=:key');
$qry->bindValue('key', $request->key);
$result = $qry->execute()->fetchArray(1);
header('Content-Type: application/json');
echo json_encode(array(
	'data' => $result['value'],
	'timestamp' => $result['timestamp']
));
