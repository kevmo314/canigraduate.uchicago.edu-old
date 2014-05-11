<?php
$db = new SQLite3('canigraduate.db');
$db->exec('CREATE TABLE IF NOT EXISTS distribution (signature CHAR(10) PRIMARY KEY, DM INTEGER DEFAULT 0, D INTEGER DEFAULT 0, DP INTEGER DEFAULT 0, CM INTEGER DEFAULT 0, C INTEGER DEFAULT 0, CP INTEGER DEFAULT 0, BM INTEGER DEFAULT 0, B INTEGER DEFAULT 0, BP INTEGER DEFAULT 0, AM INTEGER DEFAULT 0, A INTEGER DEFAULT 0);');
$db->exec('CREATE TABLE IF NOT EXISTS hashes (signature CHAR(32) PRIMARY KEY);');

$signature = $_GET['class'];
if(strlen($signature) != 10 || $signature[4] != ' ') {
//	die(); // woo silent failure!
}

$qry = $db->prepare('SELECT * FROM distribution WHERE signature=:name');
$qry->bindValue('name', $signature);
$result = $qry->execute();
$values = $result->fetchArray(2);
array_shift($values); // so much easier than writing a good query :v
echo implode('|', $values);
