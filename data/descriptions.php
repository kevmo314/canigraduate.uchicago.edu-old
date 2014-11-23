<?php
$data = file_get_contents('http://collegecatalog.uchicago.edu/ribbit/index.cgi?page=getcourse.rjs&code=' . urlencode($_GET['class']));
$matches = array();
$data = str_replace(array("\r", "\n"), '', $data);
preg_match("#courseblockdesc\">(.+?)</p>#", $data, $matches);
echo(strip_tags($matches[1]));
