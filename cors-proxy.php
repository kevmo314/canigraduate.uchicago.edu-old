<?php
if($_GET['action'] == 'description') { 
	$data = file_get_contents('http://collegecatalog.uchicago.edu/ribbit/index.cgi?page=getcourse.rjs&code=' . urlencode($_GET['class']));
	$matches = array();
	$data = str_replace(array("\r", "\n"), '', $data);
	preg_match("#courseblockdesc\">(.+?)</p>#", $data, $matches);
	echo(strip_tags($matches[1]));
}
if($_GET['action'] == 'sections') {
	$years = array($_GET['qtr']);
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
					'schedule' => trim(str_replace('<br>','', $arr[3][$i])),
					'enrollment' => trim($arr[4][$i]) . '/' . str_replace(array('NO LIMIT', 'CONSENT REQUIRED'),'∞', trim($arr[5][$i]))
				);
			}
		}
	}
	echo json_encode($data);
}
?>
