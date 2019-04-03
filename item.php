<?php

class Item
{

	protected $table, $values, $columns;
	protected $id = -1;
	
	function __construct($arr){
		$this -> values = $arr;
	}

	function get_id(){
		return $this -> id;
	}
	
	function get_values(){
		return $this -> values;
	}

	function addable(){
		$answer = True;
		return $answer;
	}

	function logged_in(){
		$answer = True;
		return $answer;
	}

	function add(){
		global $conn;
		$query = "";
		if ($this -> addable() && $this -> logged_in()){
			$columns_string = "(";
			$values_string = "("; 
			foreach ($this -> values as $column => $value){
				$columns_string = $columns_string . $column . ', ';
				$values_string = $values_string . "'" . $value . "'" . ', ';
			}
			$columns_string = substr($columns_string, 0, -2) . ")";
			$values_string = substr($values_string, 0, -2) . ")";
			$query = "INSERT INTO $this->table  $columns_string VALUES $values_string";
			$result = $conn->query($query);
			if(!$result){
				echo "could not add" . "<br>";
				return False;
			}
			else{
				$this -> id = mysqli_insert_id($conn);
				echo "adding sample...	" . "<br>" . $query . "<br>";
				return True;
			}
		}
		else{
			echo "could not add- could be missing fields";
			return False;
		}
	}

	function get_all(){
		global $conn;
		$query = "SELECT * FROM $this->table";
		$result = $conn->query($query);
		return $result;
	}

	function get_1_param($column, $value){
		global $conn;
		$query = "SELECT * FROM $this->table WHERE $column = $value";
		$result = $conn->query($query);
		return $result;
	}

}

?>