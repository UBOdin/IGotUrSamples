<?php

ini_set("display_errors",1);
include "connect.php";
	$table = "Test";

	$query = "SELECT * FROM ";
	$query = $query . $table . " ";
	
	$type;
	$equality;
	$val; 

	foreach ($_GET as $key => $value) {
		//is it a t value?
		if ($key[0] == 't') {
			if ($key[1] > '1') {
				$query = $query . " AND ";
			}
			$type = $value;
		} else if ($key[0] == 'e') {
			$equality = "=";

			//get next two to add to query
			if ($value == false) {
				$equality = "<>";
			}
		} else if ($key[0] == 'v') {
			if ($key[1] == '1') {
				$query = $query . "WHERE ";
			}

			$val = $value;

			$query = $query . $type . $equality . $val; 

	}
}

	$query = $query . ";";
	$conn = connect();

class x {
}
	
	$stmt = $conn->prepare($query);
	$stmt->execute();

	echo json_encode($stmt->fetchAll(PDO::FETCH_CLASS, "x"));
?>
