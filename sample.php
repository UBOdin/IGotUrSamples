<?php

require_once "item.php";

class Sample extends Item
{

	function __construct($values){
		parent::__construct($values);
		$this -> columns = array('date_collected','density','epp','hb','filter_paper');
		$this -> table = 'Samples';
	}

	function add_tube(){
		global $conn;
		$query = "INSERT INTO Tubes  (sample_id) VALUES (" . "'" . $this -> id . "'" . ")";
		$result = $conn->query($query);
		if(!$result){
			echo "could not add" . "<br>";
		}
		else{
			$this -> id = mysqli_insert_id($conn);
			echo "adding tube...	" . "<br>" . $query . "<br>";
		}
	}
	
	function split_sample($splits){
		for ($i = 0; $i < $splits; $i++){
			add_tube();
		}
	}

	function add(){
		$success = parent::add();
		if($success){
			$this -> add_tube();		
		}

	}

	static function add_all(&$samples){
		foreach($samples as $sample){
			$sample -> add();
		}
	}

	

}
?>
