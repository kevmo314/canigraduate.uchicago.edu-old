<?php
include('include/db.php');
include('include/curl.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$cookie_file = '/tmp/cookies' . rand();

function checkSignature($studentid, $class) {
	global $db;
	// check if we've stored this student/class pair already into the distribution
	$hash = hashSignature($studentid, $class);
	return @$db->exec("INSERT INTO hashes (signature) VALUES('$hash')");
}
function storePlacement($placement) {
	incrementCounter('placement_distribution', array(
		'signature' => $placement
	));
}
function storeGrade($class, $grade) {
	incrementCounter('distribution', array(
		'signature' => $class,
		'gpa' => $grade
	));
}
function storeYearGrade($quarter, $year, $grade) {
	incrementCounter('year_distribution', array(
		'quarter' => $quarter,
		'year' => $year,
		'gpa' => $grade
	));
}
function storeQuarterIndex($quarter_index, $signature) {
	incrementCounter('class_quarter_index', array(
		'signature' => $signature,
		'quarter_index' => $quarter_index
	));
}
function storeGradeIndex($quarter_index, $grade) {
	incrementCounter('grade_quarter_index', array(
		'gpa' => $grade,
		'quarter_index' => $quarter_index
	));
}
function toTermOrdinal($quarter) {
	$split = explode(' ', $quarter);
	$year = intval($split[1]);
	$quarters = array('Winter','Spring','Summer','Autumn');
	return array_search($split[0], $quarters) + 4 * $year; // lol let's hope it works?
}
function gradeToGPA($grade) {
	$values = array(
		'A' => 4.0, 'A-' => 3.7,
		'B+' => 3.3, 'B' => 3.0, 'B-' => 2.7,
		'C+' => 2.3, 'C' => 2.0, 'C-' => 1.7,
		'D+' => 1.3, 'D' => 1.0, 'F' => 0.0
	);
	return array_key_exists($grade, $values) ? $values[$grade] : $grade; // if it doesn't exist, pass as-is
}

// The actual script

$posted = get('https://my.uchicago.edu/Shibboleth.sso/Login?target=https://my.uchicago.edu/Login', $cookie_file);
$saml_intermediary = post('https://shibboleth2.uchicago.edu/idp/profile/SAML2/Redirect/SSO?execution=e1s1', array(
	'j_username' => $request->cnet,
	'j_password' => $request->password,
	'_eventId_proceed' => true
), $cookie_file);
preg_match_all('/name="(.+?)" value="(.+?)"/', $saml_intermediary, $matches);
if(sizeof($matches[0]) < 2) {
	http_response_code(400);
	die('Authentication failed. 2FA is not currently supported. If you have it enabled, then, well, that\'s unfortunate. :P');
}
post('https://my.uchicago.edu/Shibboleth.sso/SAML2/POST', array(
	'RelayState' => html_entity_decode($matches[2][0]),
	'SAMLResponse' => html_entity_decode($matches[2][1])
), $cookie_file);

$buf2 = get('https://my.uchicago.edu/f/u21302l1s4/p/myCoursesAndGrades.u21302l1n15/max/render.uP?pCp', $cookie_file);
unlink($cookie_file);
preg_match_all('/td\>(\w{4} \d{5}) (\w{6} \d{4}).+?td.+?td.+?td.+?td.+?td.+?td\>(.+?)\</s', $buf2, $history_matches);
preg_match('/ID Number: (\d{6})/', $buf2, $idmatch);
$out = array();
$seen = array(); // id hashmap
$new_vertices = array();
// find classes taken
for($i = 0; $i < count($history_matches[1]); $i++) {
	$grade = $history_matches[3][$i];
	if(strlen($grade) > 1) {
		$grade = str_replace('I', '', $grade);
	}
	array_push($out, array('id' => $history_matches[1][$i], 'gpa' => gradeToGPA($grade), 'quarter' => $history_matches[2][$i], 'quality' => is_numeric(gradeToGPA($grade))));
	$seen[$history_matches[1][$i]] = true;
}
// find current classes
preg_match_all('/submitCoop\(\'(\w{4} \d{5}).+?(\w{6} \d{4})\'\);/', $buf2, $current_matches);
for($i = 0; $i < count($current_matches[1]); $i++) {
	if(!array_key_exists($current_matches[1][$i], $seen)) {
		array_push($out, array('id' => $current_matches[1][$i], 'gpa' => null, 'quarter' => ucfirst(strtolower($current_matches[2][$i])), 'quality' => false));
		$seen[$current_matches[1][$i]] = true;
	}
}
// TODO: migrate this elsewhere
$out_placements = array();
// check calc placement tests
$placements = array(
	'MATHEMATICS 15100' => '+MATH 15100',
	'MATHEMATICS 15100-15200' => '+MATH 15200',
	'MATHEMATICS 15100-15200-15300' => '+MATH 15300',
	'Start in MATH 20700' => '+MATH 19900', // more like 'waiving' the requirement, but close enough...
	'CHEMISTRY 11101' => '+CHEM 11100',
	'CHEMISTRY 11101-11201' => '+CHEM 11200',
	'CHEMISTRY 11101-11201-11301' => '+CHEM 11300',
	'STATISTICS 22000' => '+STAT 22000',
	'PHYSICS 12100' => '+PHYS 12100',
	'PHYSICS 12100-12200' => '+PHYS 12200',
	'PHYSICS 12100-12200-12300' => '+PHYS 12300',
	'10000-LEVEL BIOLOGICAL SCIENCES' => '+BIOS 10130'
);
foreach($placements as $k => $v) {
	if(strpos($buf2, $k) !== false && !array_key_exists(substr($v, 1), $seen)) {
		array_push($out_placements, $v);
		$seen[substr($v, 1)] = true;
		// $v is prefixed with +, so checkSignature won't fail later on
		if(checkSignature($idmatch[1], $v)) {
			storePlacement($v);
		}
	}
}
// check language placement/competency
/*$languages = array('GREK','LATN','MOGK','CHIN','JAPN','KORE','GRMN','NORW','YDDH','BASQ','SWAH','AKKD','ARAB','ARAM','ARME','EGPT','HEBR','KAZK','PERS','TURK','UGAR','UZBK','CATA','FREN','ITAL','PORT','SPAN','BCSN','CZEC','GEOR','POLI','RUSS','BANG','HIND','MALA','MARA','PALI','SANS','TAML','TLGU','TBTN','URDU');
$ordinals = array('101', '102', '103', '201', '202', '203', '301', '302', '303'); // I don't think placements go any higher...
foreach($languages as $lang) {
	foreach($ordinals as $index => $ordinal) {
		if(strpos($buf2, 'Start in ' . $lang . ' ' . $ordinal) !== false) {
			if($index > 0) {
				$subordinal = $ordinals[$index - 1];
				if(!array_key_exists('+' . $lang . ' ' . $subordinal . '00', $seen)) {
					array_push($out_placements, '+' . $lang . ' ' . $subordinal . '00');
					$seen[$lang . ' ' . $subordinal . '00'] = true;
				}
			}
			break;
		}
	}
}*/
$transcript = array();
foreach($out as $record) {
	if(property_exists($request, 'suppress_gpa') && $request->suppress_gpa) {
		if(($record['quality'] && $record['gpa'] != 0.0) || $record['gpa'] === null) {
			// only include passing quality grades
			array_push($transcript, array(
				'quarter' => $record['quarter'],
				'id' => $record['id'],
				'quality' => true,
				'gpa' => null
			));
		}
	} else {
		array_push($transcript, $record);
	}
}
echo json_encode(array(
	'transcript' => $transcript,
	'placements' => $out_placements
));
foreach($out as $record) {
	$signature = $record['id'];
	$split = explode(' ', $record['quarter']);
	$quarter = trim($split[0]);
	$year = intval(trim($split[1]));
	$grade = $record['gpa'];
	$quarter_index = toTermOrdinal($record['quarter']) - toTermOrdinal('Autumn ' . substr($out[0]['quarter'], -4));
	// only store quality or passing grades.
	if(($record['quality'] || $record['gpa'] == 'P') && checkSignature($idmatch[1], $signature)) {
		storeYearGrade($quarter, $year, $grade);
		storeGrade($signature, $grade);
		storeGradeIndex($quarter_index, $grade);
		storeQuarterIndex($quarter_index, $signature);
		if($grade != 0) { array_push($new_vertices, $signature); }
	}
}
$db->exec('BEGIN;');
foreach($new_vertices as $left) {
	foreach($new_vertices as $right) {
		if($left != $right) {
			incrementCounter('edges', array(
				'left' => $left,
				'right' => $right
			));
		}
	}
}
$db->exec('COMMIT;');
