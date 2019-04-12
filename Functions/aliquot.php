<?php

function aliquot($aliquots, $sample_id, $conn){
	
	$query = "INSERT INTO Tubes (sample_id) VALUES (" . $sample_id . ")";
	echo "query: " . $query . "<br>";

	for($i=0; $i < $aliquots; $i++){
		$result = $conn->query($query);
		if(!$result){
			echo "aliquot failed" . "<br>" . "<br>";
		}
		else{
			echo "aliquoted success" . "<br>" . "<br>";
		}
	}

}

?>