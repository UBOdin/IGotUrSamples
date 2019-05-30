<?php

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
	echo "query: " . $query . "<br>";
	$result = $conn->query($query);

	if(!$result){
		echo "add failed" . "<br>" . "<br>";
		return -1;
	}
	else{
		$id = mysqli_insert_id($conn);
		echo "add success" . "<br>" . "<br>";
		return $id;
	}

}
?>