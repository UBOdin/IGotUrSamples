<?php

include "connect.php";
	
	$query = "SELECT * FROM ";
	$query = $query . 'Test';
	
	$conn = connect();

	$result = mysql_connect($query, $conn);
	$answer = array();
	$rows = mysqli_num_rows($result);
	for($j=0 ; $j<$rows; ++$j){
		$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
		$answer[] = $row;
	}
	echo json_encode($answer);



?>
