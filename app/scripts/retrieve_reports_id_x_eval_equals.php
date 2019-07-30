<?php

ini_set("display_errors",1);
include "connect.php";
	
    $type = $_GET['type'];
    $eval = $_GET['eval'];

	$query = "SELECT id, COUNT(*) AS frequency FROM Samples WHERE unrestrictedconsent = TRUE ";
	
	if ($type != "All") {
		$query = $query . " AND type = '";
		$query = $query . $type . "'";
	}

    $query = $query . " AND eval = '";
    $query = $query . $eval;
    $query = $query . "' GROUP BY id ORDER BY id";

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

