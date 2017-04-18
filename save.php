<?php
	
	$baseFromJavascript = $_REQUEST['base64'];
	$base_to_php = explode(',', $baseFromJavascript);
	$data = base64_decode($base_to_php[1]);
	$newname = $_REQUEST['uuidname'];
	$filepath = "uploads/" . $newname . ".gif";
	file_put_contents($filepath, $data);
		
	$command= 'curl -v -F "username=alonso19m" -F "source_image_url=http://acmbdeveloper.com/calaverizzimas/'.$filepath.'"  -F "api_key=dc6zaTOxFJmzC" -F "tags=tag1,tag2,tag3" -F "source_post_url=http://acmbdeveloper.com" "http://upload.giphy.com/v1/gifs"';
	
	$exec = exec($command);
	
	$obj = json_decode($exec);
	
	/*print('http://media.giphy.com/media/'.$obj->{'data'}->{'id'}.'/giphy.gif');*/
    print('{"id":"'.$obj->{'data'}->{'id'}.'","success":"true"}');

?>