<?php

function retrieve_all($table, $conn){
	
	$query = "SELECT * FROM ";
	$query = $query . $table;
	
	$result = $conn->query($query);
	$answer = array();
	$rows = mysqli_num_rows($result);
	for($j=0 ; $j<$rows; ++$j){
		$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
		$answer[] = $row;
	}
	return json_encode($answer);

}

?>