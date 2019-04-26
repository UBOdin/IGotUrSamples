<?php

include "connect.php";
	
	$query = "SELECT * FROM ";
	$query = $query . 'Test';
	
	$conn = connect();

	$result = $conn->query($query);
	$answer = array();
	$rows = mysqli_num_rows($result);
	for($j=0 ; $j<$rows; ++$j){
		$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
		$answer[] = $row;
	}
	echo json_encode($answer);



?>
