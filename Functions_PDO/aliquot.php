<?php

function aliquot($aliquots, $sample_id, $conn){
	
	try{
		$query = "INSERT INTO Tubes (sample_id) VALUES (" . $sample_id . ")";
		echo "query: " . $query . "<br>" . "<br>";
	
		for($i=0; $i < $aliquots; $i++){
			$result = $conn->query($query);
		}
		echo "aliquoted success" . "<br>";
	}

	catch(PDOException $e){
		echo "aliquot failed: " . $e->getMessage() . "<br>" . "<br>";
	}

}

?>