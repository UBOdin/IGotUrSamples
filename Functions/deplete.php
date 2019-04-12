<?php

function deplete($values, $conn){

	$query = "DELETE FROM Tubes WHERE tube_id IN (";
	echo "query: " . $query . "<br>";

	foreach($values as $index=>$value){
		$query = $query . $value . ",";
	}
	$query = substr($query, 0, -1) . ")";

	$result = $conn->query($query);
	if(!$result){
		echo "deplete failed" . "<br>" . "<br>";
	}
	else{
		echo "deplete success" . "<br>" . "<br>";
	}

}

?>