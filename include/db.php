<?php
$db = new SQLite3($_SERVER['DOCUMENT_ROOT'] . '/canigraduate.db');
$db->busyTimeout(15000);
// Yeah this can definitely be improved. Basically using sqlite as a kv store right now...
$db->exec('CREATE TABLE IF NOT EXISTS distribution (signature CHAR(10), gpa REAL, count INTEGER DEFAULT 0, PRIMARY KEY (signature, gpa));');
$db->exec('CREATE TABLE IF NOT EXISTS hashes (signature CHAR(40) PRIMARY KEY);');
$db->exec('CREATE TABLE IF NOT EXISTS year_distribution (quarter VARCHAR(6), year INTEGER, gpa REAL, count INTEGER DEFAULT 0, PRIMARY KEY (quarter, year, gpa));');
$db->exec('CREATE TABLE IF NOT EXISTS placement_distribution (signature VARCHAR(16) PRIMARY KEY, count INTEGER DEFAULT 0);');
$db->exec('CREATE TABLE IF NOT EXISTS class_quarter_index (signature VARCHAR(10), quarter_index INTEGER, count INTEGER DEFAULT 0, PRIMARY KEY (signature, quarter_index))');
$db->exec('CREATE TABLE IF NOT EXISTS grade_quarter_index (gpa VARCHAR(10), quarter_index INTEGER, count INTEGER DEFAULT 0, PRIMARY KEY (gpa, quarter_index))');

$db->exec('CREATE TABLE IF NOT EXISTS evaluations (signature CHAR(10) PRIMARY KEY, gpa VARCHAR(3), E INTEGER DEFAULT 0, D INTEGER DEFAULT 0, C INTEGER DEFAULT 0, B INTEGER DEFAULT 0, A INTEGER DEFAULT 0)');
$db->exec('CREATE TABLE IF NOT EXISTS evaluation_hashes (signature CHAR(40) PRIMARY KEY);');
$db->exec('CREATE TABLE IF NOT EXISTS prerequisites (signature CHAR(10), prerequisite CHAR(10), count INTEGER DEFAULT 0, PRIMARY KEY (signature, prerequisite))');
$db->exec('CREATE TABLE IF NOT EXISTS comments (signature CHAR(10) PRIMARY KEY, comment TEXT)');

$db->exec('CREATE TABLE IF NOT EXISTS edges (left CHAR(10), right CHAR(10), count INTEGER DEFAULT 0, PRIMARY KEY (left, right))');
$db->exec('CREATE TABLE IF NOT EXISTS watches (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, quarter CHAR(11), quarter_id INTEGER, course CHAR(10), section VARCHAR(10), activity VARCHAR(10))');
$db->exec('CREATE TABLE IF NOT EXISTS storage (key CHAR(8) PRIMARY KEY, value TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)');

// TODO: delete this shit when its's classes api decides to get finished. >.>
$db->exec('CREATE TABLE IF NOT EXISTS enrollment (quarter CHAR(11), id CHAR(10), section VARCHAR(10), activity VARCHAR(10), enrolled INTEGER, capacity INTEGER, updated DATETIME DEFAULT CURRENT_TIMESTAMP)');

function hashSignature($studentid, $class) {
	$hash = sha1($studentid . $class);
	for($i = 0; $i < 1000; $i++) {
		$hash = sha1($hash . $studentid . $class);
	}
	return $hash;
}

function incrementCounter($table, $binds) {
	global $db;
	$parameters = array_keys($binds);
	$key_statement = implode(',', $parameters);
	foreach($parameters as &$parameter) {
		$parameter = ':' . $parameter;
	}
	$value_statement = implode(',', $parameters);
	foreach($parameters as &$parameter) {
		$parameter = substr($parameter, 1) . '=' . $parameter;
	}
	$where_statement = implode(' AND ', $parameters);
	$query = $db->prepare("INSERT OR REPLACE INTO $table ($key_statement, count) VALUES ($value_statement, 
		COALESCE((SELECT count FROM $table WHERE $where_statement), 0) + 1);");
	foreach($binds as $bind => $value) {
		$query->bindValue(':' . $bind, $value);
	}
	return $query->execute();
}
