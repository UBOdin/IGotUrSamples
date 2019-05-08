<?php

ini_set("display_errors",1);
include "connect.php";
	$query = "SELECT * FROM ";
	$query = $query . "Samples";

	$conn = connect();

class x {
}
	
	$stmt = $conn->prepare($query);
	$stmt->execute();

	echo json_encode($stmt->fetchAll(PDO::FETCH_CLASS, "x"));
?>
