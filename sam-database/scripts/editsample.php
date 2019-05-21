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
        $aliquots_previous;
		$sample_id = $_GET["key_internal"];

		//get old aliquots
		$query = "SELECT `aliquots` from Samples WHERE key_internal=" . $sample_id . ";";

		$conn = connect();

		class x {
		}

		$stmt = $conn->prepare($query);
		$stmt->execute();

		$aliquots_previous = $stmt->fetchAll(PDO::FETCH_CLASS, "x");

        $table = "Tubes";
		
		//compare and add/subtract tubes as needed
		if ((int)$aliquots_previous < (int)$_GET["aliquots"]) {
			

        	for ($x = (int)$aliquots_previous; $x < (int)$_GET["aliquots"]; $x++) {
            	$query = "INSERT INTO `" . $db . "`.`" . $table . "` " .
            	"(`sample_key_internal`) VALUES ('" . $sample_id . "')";

            echo $query . "<br>";

            $conn->exec($query);
        	}
		} else if ((int)$aliquots_previous > (int)$_GET["aliquots"]) {
			$difference = (int)$aliquots_previous - (int)$_GET["aliquots"]);
			$query = "DELETE FROM " . $table . " WHERE sample_key_internal=" . $sample_id . " LIMIT " . $difference . ";";

			echo $query . "<br>";
			$conn->exec($query);
		} else {
		}
		
		$table = "Samples";

		//update sample entry with new information
		foreach ($_GET as $column => $value) {
			if ($column == "key_internal") {
			} else {
				$columns_string = $columns_string . "`" . $column . "`" . ', ';
				$values_string = $values_string . "'" . $value . "'" . ', ';
			}
		}
		$columns_string = substr($columns_string, 0, -2) . ")";
		$values_string = substr($values_string, 0, -2) . ")";
		$query = "UPDATE " . $table . " SET " . $columns_string . " VALUES " . $values_string . " WHERE key_internal=" . $sample_id;
		
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
