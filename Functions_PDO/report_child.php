<?php

class x {
}

function report_child($type, $conn){
	
	$query = "SELECT child_id, COUNT(*) AS frequency FROM Samples WHERE consent = TRUE AND type = ";
	$query = $query . $type;
	$query = $query . " GROUP BY child_id ORDER BY child_id";

	$stmt = $conn->prepare($query);
	$stmt->execute();

	return json_encode($stmt->fetchAll(PDO::FETCH_CLASS, "x"));

}

?>
