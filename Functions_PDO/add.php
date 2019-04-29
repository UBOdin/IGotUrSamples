<?php

function add($columns, $values, $table, $conn){

	try{
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
		$conn->exec($query);
	
		$id = $conn->lastInsertId();
		echo "add success" . "<br>" . "<br>";
		return $id;
	}

	catch(PDOException $e){
		echo "add failed: " . $e->getMessage() . "<br>" . "<br>";
		return -1;
	}

}
?>