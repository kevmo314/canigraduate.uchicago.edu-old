<?php
$db = new SQLite3('canigraduate.db');
$db->exec('CREATE TABLE IF NOT EXISTS edges (left CHAR(10), right CHAR(10), count INTEGER DEFAULT 0)');
$out = explode('|', $_GET['classes']);
$recommendations = array();
foreach($out as $left) {
	$qry = $db->prepare('SELECT right, count FROM edges WHERE left=:left;');
	$qry->bindValue(':left', $left);
	$res = $qry->execute();
	while($arr = $res->fetchArray(1)) {
		if(!in_array($arr['right'], $out)) {
			if(!array_key_exists($arr['right'], $recommendations)) {
				$recommendations[$arr['right']] = 0;
			}
			$recommendations[$arr['right']] += $arr['count'];
		}
	}
}
arsort($recommendations);
echo implode('|', array_slice(array_keys($recommendations), 0, 5));
