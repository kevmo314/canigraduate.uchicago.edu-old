<?php
include('../include/curl.php');
include('../include/AmazonECS.class.php');
include('../config.php');

function generateBNData($request) {
	// converted from https://classes.uchicago.edu/js/textbooks.js?12=345
	// assume xlists already handled
	$term = $request->quarter;
	$term = str_replace('Winter 20', 'W', $term);
	$term = str_replace('Autumn 20', 'F', $term);
	$term = str_replace('Spring 20', 'S', $term);
	$term = str_replace('Summer 20', 'A', $term);

	$xml = '<?xml version="1.0" encoding="UTF-8"?><textbookorder><courses>';

	$idents = explode(',', $request->id);
	foreach($idents as $ident) {
		$id = explode(' ', $ident);
		$dept = $id[0];
		$num = $id[1];
		$xml .= '<course dept="' . $dept . '" num="' . $num . '" sect="' . $request->section . '" term="' . $term . '"/>';
	}
	$xml .= '</courses></textbookorder>';

	$arrCur = explode(' ', $idents[0]);
	$dept = $arrCur[0];
	$storeId = 15063;
	if($dept == 'MSTR' || $dept == 'MLAP' || (substr($dept, 0, 3) == 'BUS' && $dept != 'BUSF')) {
		$storeId = 15069;
	}
	$out = array(
		'storeId' => $storeId,
		'catalogId' => 10001,
		'langId' => -1,
		'termMapping' => 'Y',
		'courseXml' => $xml
	);
	return $out;
}

function getAmazonPrice($isbn) {
	$client = new AmazonECS(AMAZON_ACCESS_KEY, AMAZON_SECRET_KEY, 'com', 'kevmo314-20');
	$results = $client->category('Books')->search($isbn);
	if($results->Items->TotalResults == 0) {
		return array('new' => null, 'used' => null);
	}
	if($results->Items->TotalResults == 1) {
		$offers = $client->responseGroup('Offers')->lookup($results->Items->Item->ASIN);
	} else {
		$offers = $client->responseGroup('Offers')->lookup($results->Items->Item[0]->ASIN);
	}
	sleep(0.25);
	return array(
		'new' => $offers->Items->Item->OfferSummary->LowestNewPrice->FormattedPrice,
		'used' => $offers->Items->Item->OfferSummary->LowestUsedPrice->FormattedPrice
	);
}

function generateCoopURL($request) {
	// converted from https://classes.uchicago.edu/js/textbooks.js?12=345
	$url = 'http://coursebooks.semcoop.com/listings/';
	$arrTerm = explode(' ', $request->quarter);
	if($arrTerm[0] == 'Summer' || $arrTerm[0] == 'Autumn') {
		$yearLow = intval($arrTerm[1]);
		$yearHigh = intval($arrTerm[1]) + 1;
	} else { // Winter and Spring get last year's dates
		$yearLow = intval($arrTerm[1]) - 1;
		$yearHigh = intval($arrTerm[1]);
	}
	$url .= "$yearLow-$yearHigh/" . strtolower($arrTerm[0]) . '/';

	$arrIdent = explode(' ', $request->id);
	$url .= strtolower($arrIdent[0]) . '/' . $arrIdent[1] . '/' . $request->section;

	return $url;
}

$request = json_decode(file_get_contents("php://input"));

$data = post('http://uchicago.bncollege.com/webapp/wcs/stores/servlet/TBListView?cm_mmc=RI-_-491-_-A-_-1', generateBNData($request));

// process without domdocument because why not... >.>
$classes = array_slice(explode('book_details', $data), 1);
$out = array();
foreach($classes as $class) {
	preg_match('/h1\>(.*?)\<\/h1/', $class, $title);
	$required = strpos($class, 'REQUIRED') !== false;
	preg_match('/By (.*?)\</', $class, $author);
	preg_match('/EDITION:(?:.*?)nbsp;(.*?)\</smi', $class, $edition);
	preg_match('/PUBLISHER:(?:.*?)nbsp;(.*?)\</smi', $class, $publisher);
	preg_match('/ISBN:(?:.*?)nbsp;(.*?)\</smi', $class, $isbn);
	preg_match('/http:(.+?)\'/', $class, $link);
	preg_match('/BUY NEW(?:.+?)span(?:.+?)\>(.+?)\</smi', $class, $new_price);
	preg_match('/BUY USED(?:.+?)span(?:.+?)\>(.+?)\</smi', $class, $used_price);
	$out[trim($isbn[1])] = array(
		'title' => trim($title[1]),
		'author' => trim($author[1]),
		'edition' => trim($edition[1]),
		'publisher' => trim($publisher[1]),
		'isbn' => trim($isbn[1]),
		'link' => urldecode(html_entity_decode(trim($link[1]))),
		'required' => $required,
		'price' => array(
			'bn' => array(
				'new' => trim($new_price[1]) == 'Price not yet available**' ? null : trim($new_price[1]),
				'used' => trim($used_price[1]) == 'Price not yet available**' ? null : trim($used_price[1])
			)
		)
	);
}

$document = new DOMDocument();
$document->loadHTML(get(generateCoopURL($request)));

$elements = $document->getElementsByTagName('li');
foreach($elements as $element) {
	if($element->getAttribute('class') == 'book even' || $element->getAttribute('class') == 'book odd') {
		// easier to use regex for this part, since we have to fetch individual components
		$tmpDOM = new DOMDocument();
		$tmpDOM->appendChild($tmpDOM->importNode($element, true));
		$text = $tmpDOM->saveHTML();
		preg_match('/ISBN-13: (.+?)\</smi', $text, $isbn);
		preg_match('/class="price"\>(.+?)\</smi', $text, $price);
		if(!array_key_exists($isbn[1], $out)) {
			preg_match('/a href="(?:.+?)"\>(.+?)\</smi', $text, $title);
			preg_match('/class="author"\>(.+?)\</smi', $text, $author);
			$out[$isbn[1]] = array(
				'title' => trim(html_entity_decode($title[1])),
				'author' => $author[1],
				'edition' => null,
				'publisher' => null,
				'isbn' => $isbn[1],
				'link' => null,
				'required' => strpos($text, 'required') !== false,
				'price' => array(
					'coop' => array(
						'new' => trim($price[1]), 'used' => null
					)
				)
			);
		} else {
			$out[$isbn[1]]['price']['coop'] = array(
				'new' => trim($price[1]), 'used' => null
			);
		}
	}
}

foreach($out as &$book) {
	$book['price']['amazon'] = getAmazonPrice($book['isbn']);
}

echo json_encode(array_values($out));
