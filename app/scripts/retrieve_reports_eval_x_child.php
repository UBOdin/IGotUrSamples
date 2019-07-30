<?php

ini_set("display_errors",1);
include "connect.php";
	
    $type = $_GET['type'];

	$query = "SELECT id, eval FROM Samples WHERE unrestrictedconsent = TRUE ";

	if ($type != "All") {
		$query = $query . " AND type = '";
		$query = $query . $type . "'";
	}

	$query = $query . " ORDER BY id, eval";

	$conn = connect();

	try{

		class x {
		}
	
		$stmt = $conn->prepare($query);
		$stmt->execute();

		echo json_encode($stmt->fetchAll(PDO::FETCH_CLASS, "x"));
	}

	catch(PDOException $e){
		echo "failed: " . $e->getMessage() . "<br>";
	}
?>
