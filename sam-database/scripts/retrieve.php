<?php

ini_set("display_errors",1);
include "connect.php";

	foreach ($GET as $key => $value) {
		//is it a t value?
			//get next two to add to query
	}
	
	$query = "SELECT * FROM ";
	$query = $query . "Test";

	$conn = connect();

class x {
}
	
	$stmt = $conn->prepare($query);
	$stmt->execute();

	echo json_encode($stmt->fetchAll(PDO::FETCH_CLASS, "x"));
?>
