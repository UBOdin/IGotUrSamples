<?php

function deplete($values, $conn){

	try{
		$query = "DELETE FROM Tubes WHERE tube_id IN (";

		foreach($values as $index=>$value){
			$query = $query . $value . ",";
		}
		$query = substr($query, 0, -1) . ")";
	
		$result = $conn->query($query);
		echo "query: " . $query . "<br>";
		echo "deplete success" . "<br>" . "<br>";
	}

	catch(PDOException $e){
		echo "deplete failed" . "<br>" . "<br>";
	}

}

?>