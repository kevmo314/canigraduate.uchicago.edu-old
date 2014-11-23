<?php
if(isset($_GET['term_id'])) {
	$years = explode('|', $_GET['term_id']);
} else {
	$years = array(459,458,457,456,455,454,453,452,451,450,449,448,447,446,445,443,442);
}
$data = array();
$tokens = split(' ', $_GET['class']);
// legacy functionality
foreach($years as $year) {
	$html = str_replace(array("\r","\n"),'',file_get_contents('http://timeschedules.uchicago.edu/view.php?dept=' . $tokens[0] . '&term=' . $year));
	$arr = array();
	$qtr = array();
	preg_match('#<h2>.+?\) (.+?)</h2>#', $html, $qtr);
	preg_match_all('#name="' . $tokens[1] . '".+?&nbsp;-&nbsp;([a-zA-Z0-9]+).+?smallplain.+?smallplain.+?smallplain">(.+?)</span>.+?smallplain">(.+?)</span>.+?smallplain.+?smallplain.+?smallplain.+?smallplain">(.+?)<.+?smallplain">(.+?)<#', $html, $arr);
	for($i = 0; $i < sizeof($arr[0]); $i++) {
		if(strlen(trim($arr[2][$i])) > 0) {
			$data[] = array(
				'section' => $arr[1][$i],
				'quarter' => $qtr[1],
				'instructor' => trim($arr[2][$i]),
				'schedule' => trim(str_replace(array('AM-', 'PM-','<br>'),array('-','-',''), $arr[3][$i])),
				'enrollment' => trim($arr[4][$i]) . '/' . str_replace(array('NO LIMIT', 'CONSENT REQUIRED'),'∞', trim($arr[5][$i]))
			);
		}
	}
}
if(isset($_GET['format']) && $_GET['format'] == 'csv') {
	$fp = fopen('php://output', 'w');
	fputcsv($fp, array('Section', 'Quarter', 'Instructor', 'Schedule', 'Enrollment'));
	foreach($data as $row) {
		fputcsv($fp, $row);
	}
	fclose($fp);
} else {
	echo json_encode($data);
}
