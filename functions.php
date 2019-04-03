<?php

// table contains string, representing table name
// columns contains array of strings, representing all columns in the table
// values contains dictionary of strings to strings, representing mapping of indexes to values. dictionary could contain non-column related metadata (ex. how many aliquots related to this sample to make on init... maybe should change???)
//TODO: see if there are other addable items where non-column metadata comes with each individual item. If there aren't, it will be better to not have to just pass in a dictionary of column=>value (from $_POST) rather than both columns and values, and have the # of aliquots in a separate vector
 
function add($columns, $values, $table){

	global $conn;

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

function retrieve_all($table){
	
	global$conn;
	
	$query = "SELECT * FROM ";
	$query = $query . $table;
	
	$result = $conn->query($query);
	
	$rows = mysqli_num_rows($result);
	for($j=0 ; $j<$rows; ++$j){
		$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
		foreach($row as $index=>$val){
			echo $index . ": " . $val . "<br>";
		}
	}
}
?>