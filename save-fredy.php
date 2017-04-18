<?php

$baseFromJavascript = $_REQUEST['base64'];
$base_to_php = explode(',', $baseFromJavascript);
$data = base64_decode($base_to_php[1]);
$newname = $_REQUEST['uuidname'];
$filepath = "uploads/" . $newname . ".gif";
file_put_contents($filepath, $data);

//$data = $_REQUEST['base64'];
echo 'file saved under the name:' . $newname;


?>