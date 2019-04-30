<?php

ini_set("display_errors",1);
include "connect.php";

	$query = "SELECT * FROM ";
	$query = $query . "Test ";
	
	foreach ($GET as $key => $value) {
		//is it a t value?
		if ($key[0] = 't') {

			$equality = "=";

			//get next two to add to query
			if ($value.next() == false) {
				$equality = "<>";
			}

			$query = $query . "WHERE " . $value . $equality . $value.next().next(); 
		}
	}
	

	$conn = connect();

class x {
}
	
	$stmt = $conn->prepare($query);
	$stmt->execute();

	echo json_encode($stmt->fetchAll(PDO::FETCH_CLASS, "x"));
?>
