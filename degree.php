<?php
require_once('fpdf.php');
require_once('include/fpdi/fpdi.php');
$request = json_decode($_POST['data']);
$pdf = new FPDI();
$pdf->addPage();
$pdf->setSourceFile('degree.pdf');
$tplIdx = $pdf->importPage(1);
$pdf->useTemplate($tplIdx, 0, 0, 0, 0, true);
$pdf->setFont('Courier', '', '10');
$pdf->setTextColor(0, 0, 0);

$pdf->setXY(120, 10);
$pdf->write(0, 'http://canigraduate.uchicago.edu/');

$pdf->setXY(100, 45);
$pdf->write(0, $request->heading);

// render general education
function renderGenEdColumn($x, $y, $vals) {
	global $pdf;
	foreach($vals as $index => $val) {
		$pdf->setXY($x, $y + 8 * $index);
		$pdf->write(0, $val);
	}
}
renderGenEdColumn(36, 72, array_slice($request->sosc, 0, 3));
renderGenEdColumn(76, 72, array_slice($request->art, 0, 2));
renderGenEdColumn(118, 72, array_slice($request->hum, 0, 3));
renderGenEdColumn(156, 72, array_slice($request->civ, 0, 3));
renderGenEdColumn(36, 113, array_slice($request->math, 0, 2));
renderGenEdColumn(76, 113, array_slice($request->phys, 0, 3));
renderGenEdColumn(118, 113, array_slice($request->bio, 0, 3));

// render units required
$count = min(3, sizeof($request->sosc)) + min(1, sizeof($request->art)) + min(2, sizeof($request->hum)) + min(2, sizeof($request->civ));
if(sizeof($request->art) > 1 || sizeof($request->hum) > 2 || sizeof($request->civ) > 2) {
	$count++;
}
$pdf->setXY(190, 89);
$pdf->write(0, (string)($count * 100));
$count = min(1, sizeof($request->math)) + min(2, sizeof($request->phys)) + min(2, sizeof($request->bio));
if(sizeof($request->math) > 1 || sizeof($request->phys) > 2 || sizeof($request->bio) > 2) {
	$count++;
}
$pdf->setXY(190, 129);
$pdf->write(0, (string)($count * 100));

// render major
function renderMajorBlock($x, $y, $elements) {
	global $pdf;
	foreach($elements as $index => $element) {
		$pdf->setXY($x + floor($index / 4) * 30 + ($index >= 8 ? 2 + 1.2 * floor($index / 4) : 0), $y + ($index % 4) * 8);
		$pdf->write(0, $element);
	}
}
renderMajorBlock(36, 150, array_slice($request->major, 0, 19));
renderMajorBlock(36, 189.5, array_slice($request->electives, 0, 18));

// render units required
$count = 0;
for($i = 0; $i < sizeof($request->major); $i++) {
	if(strpos($request->major[$i], ' ') !== 0 && strlen($request->major[$i]) > 0) {
		$count++;
	}
}
$pdf->setXY(185, 174);
$pdf->write(0, (string)($count*100));
$count = 0;
for($i = 0; $i < sizeof($request->electives); $i++) {
	if(strpos($request->electives[$i], ' ') !== 0 && strlen($request->electives[$i]) > 0) {
		$count++;
	}
}
$pdf->setXY(185, 213);
$pdf->write(0, (string)($count*100));

// render language requirement
$pdf->setXY(50, 241);
$pdf->write(0, $request->language);

$pdf->output();
