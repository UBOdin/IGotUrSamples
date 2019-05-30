<?php

function connect($host, $user, $password, $db_name, $port){

	$conn;

	$conn = new mysqli($host, $user, $password, $db_name, $port);
	if (mysqli_connect_error()) {
		die("Connection failed: " . mysqli_connect_error());
	}
	echo "Connected successfully" . "<br>" . "<br>";
	return $conn;

}

function add($columns, $values, $table, $conn){

	$query = "";
	$columns_string = "(";
	$values_string = "("; 
	foreach ($values as $column => $value){
		if (in_array($column, $columns)){
			$columns_string = $columns_string . $column . ', ';
			$values_string = $values_string . "'" . $value . "'" . ', ';
		}
	}
	$columns_string = substr($columns_string, 0, -2) . ")";
	$values_string = substr($values_string, 0, -2) . ")";
	$query = "INSERT INTO $table  $columns_string VALUES $values_string";
	$result = $conn->query($query);
	if(!$result){
		echo "could not add..." . $query . "<br>" . "<br>";
		return -1;
	}
	else{
		$id = mysqli_insert_id($conn);
		echo "adding item with id $id ...	" . "<br>" . $query . "<br>" . "<br>";
		return $id;
	}

}

function retrieve_all($table, $conn){
	
	$query = "SELECT * FROM ";
	$query = $query . $table;
	
	$result = $conn->query($query);
	$answer = array();
	$rows = mysqli_num_rows($result);
	for($j=0 ; $j<$rows; ++$j){
		$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
		$answer[] = $row;
	}
	print json_encode($answer);
}

function deplete($values, $conn){

	$query = "DELETE FROM Tubes WHERE tube_id IN (";

	foreach($values as $index=>$value){
		$query = $query . $value . ",";
	}
	$query = substr($query, 0, -1) . ")";

	$result = $conn->query($query);
	if(!$result){
		echo "could not delete: " . $query;
	}
	else{
		echo "deleted";
	}

}

function aliquot($aliquots, $sample_id, $conn){
	
	$query = "INSERT INTO Tubes (sample_id) VALUES (" . $sample_id . ")";

	for($i=0; $i < $aliquots; $i++){
		$result = $conn->query($query);
		if(!$result){
			echo "could not aliquot: " . $query;
		}
		else{
			echo "aliquoted! ";
		}
	}

}

?>