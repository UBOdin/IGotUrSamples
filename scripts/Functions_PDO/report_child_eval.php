<?php

class x {
}

function report_child_eval($type, $conn){
	
	$query = "SELECT child_id, eval FROM Samples WHERE consent = TRUE AND type = ";
	$query = $query . $type;
	$query = $query . " GROUP BY child_id, eval ORDER BY child_id, eval";

	$stmt = $conn->prepare($query);
	$stmt->execute();

	return json_encode($stmt->fetchAll(PDO::FETCH_CLASS, "x"));

}

?>
