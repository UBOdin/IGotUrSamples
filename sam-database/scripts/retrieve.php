<?php

ini_set("display_errors",1);
include "connect.php";

	$query = "SELECT * FROM ";
	$query = $query . "Test ";
	
	$type;
	$equality;
	$val; 

	foreach ($_GET as $key => $value) {
		//is it a t value?
		if ($key[0] == 't') {
			$type = $value;
		} else if ($key[0] == 'e') {
			$equality = "=";

			//get next two to add to query
			if ($value == false) {
				$equality = "<>";
			}
		} else if ($key[0] == 'v') {
			$val = $value;

			$query = $query . "WHERE " . $type . $equality . $val . ";"; 

	}
}

	$conn = connect();

class x {
}
	
	$stmt = $conn->prepare($query);
	$stmt->execute();

	echo json_encode($stmt->fetchAll(PDO::FETCH_CLASS, "x"));
?>
