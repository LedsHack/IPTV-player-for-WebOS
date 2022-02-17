<?php
header('Access-Control-Allow-Origin: *');
if(isset($_GET['list'])){
	if($_GET['list'] == 1){
		$j = file_get_contents( __DIR__ . DIRECTORY_SEPARATOR . 'end.json' );
		$data = json_decode($j);  
		echo json_encode($data);
	}else echo json_encode(array("err" => "eror tv id"));
}else echo json_encode(array("err" => "eror GET"));

?>