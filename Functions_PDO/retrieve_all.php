<?php

class x {
}

function retrieve_all($table, $conn){
	
	$query = "SELECT * FROM ";
	$query = $query . $table;
	
	$stmt = $conn->prepare($query);
	$stmt->execute();

	return json_encode($stmt->fetchAll(PDO::FETCH_CLASS, "x"));

}

?>