<?php

ini_set("display_errors",1);
include "connect.php";

	echo "In script";

	try{
		$query = "";
		$columns_string = "(";
		$values_string = "(";
		$db = "eehuruguayresearch_db";
		$table = "Samples";
		$sample_id = $_GET["key_internal"];

		//get old aliquots
		$query = "SELECT aliquots from Samples WHERE key_internal=" . $sample_id . ";";

		$conn = connect();

		class x {
		}

		$stmt = $conn->prepare($query);
		$stmt->execute();

		$aliquots_previous = $stmt->fetchAll(PDO::FETCH_CLASS, "x");

        $table = "Tubes";

		//delete sample if there are no more aliquots
		if ((int)$_GET["aliquots"] == 0) {
			$table = "Samples";
			$query = "DELETE FROM " . $table . " WHERE key_internal='" . $sample_id . "';";

			$conn->exec($query);
		} else if ((int)$aliquots_previous != (int)$_GET["aliquots"]) {

			if ((int)$aliquots_previous < (int)$_GET["aliquots"]) {
			

    	    	for ($x = (int)$aliquots_previous; $x < (int)$_GET["aliquots"]; $x++) {
        	    	$query = "INSERT INTO " . $table . " (sample_key_internal) VALUES ('" . $sample_id . "');";

            		echo $query . "<br>";

            		$conn->exec($query);
        		}
			} else if ((int)$aliquots_previous > (int)$_GET["aliquots"]) {
				$difference = (int)$aliquots_previous - (int)$_GET["aliquots"];
				$query = "DELETE FROM " . $table . " WHERE sample_key_internal=" . $sample_id . " LIMIT " . $difference . ";";
				echo $query . "<br>";
				$conn->exec($query);
		
        
    	        	if ((int)$_GET["aliquots"] == 0) {
       		         	$table = "Samples";
           		     	$query = "DELETE FROM " . $table . " WHERE key_internal='" .
            		    $sample_id . "';";
        	    	}
    	    } else {
			}
		} else {
		}

		$table = "Samples";
        $updates = "";
    
		//update sample entry with new information
		foreach ($_GET as $column => $value) {
			if ($column == "key_internal") {
			} else {
                $updates = $updates . " " . $column . "='" . $value . "',";
			}
		}
		$query = "UPDATE " . $table . " SET" . substr($updates,0,-1) . " WHERE key_internal='" . $sample_id . "';";
		
		echo "query: " . $query . "<br>";
		$conn->exec($query);
	
		$id = $conn->lastInsertId();
		
		//Doesn't strictly test for success, but it's a good precondition
		if ($id == $sample_id) {
			echo "add success" . "<br>" . "<br>";
		}

    }

	catch(PDOException $e){
		echo "add failed: " . $e->getMessage() . "<br>" . "<br>";
		return -1;
	}

?>
