
<?php

ini_set("display_errors",1);
include "connect.php";

	echo "In script";
	try{
		$query = "";
		$columns_string = "(";
		$values_string = "(";
		$db = "eehuruguayresearch_db";
		$table = "Shipments_batch";
        $numSamples;

		foreach ($_GET as $column => $value) {
            if ($column == "samples") {
                $numSamples = (int)$value;
            }

			//this catches the extra fields in the GET request
			//TODO: this is going to be bug-prone in the future. consider checking for the numerals in the num and id queries instead.
			if (($column[0] != "i" && $column[1] != "d") && 
				($column[1] != "u")) {
				$columns_string = $columns_string . "`" . $column . "`" . ', ';
				$values_string = $values_string . "'" . $value . "'" . ', ';
			}
		}
		$columns_string = substr($columns_string, 0, -2) . ")";
		$values_string = substr($values_string, 0, -2) . ")";
		$query = "INSERT INTO `" . $db . "`.`" . $table . "` " . $columns_string . " VALUES " . $values_string;
//		$query = "INSERT INTO $table $columns_string VALUES $values_string";
		echo "query: " . $query . "<br>";
		$conn = connect();
		$conn->exec($query);
	
		$id = $conn->lastInsertId();
		echo "add success" . "<br>" . "<br>";
	
        $query = "";
        $table = "Tubes";

		class x {
		}

        for ($i = 0; $i < $_GET["samples"]; $i++) {
			//add all keys_internal for records matching the sample_key_internal of id(x+1) AND WHERE inshipment = false to the array
			$query = "SELECT key_internal FROM Tubes WHERE (sample_key_internal=" . $_GET["id" . ($i + 1)] . ") AND (in_shipment=false);";
			$stmt = $conn->prepare($query);
			$stmt->execute();
			
			$tubeIDs = array();
			$tubeIDs = $stmt->fetchAll();
			
			//for num(x+1)
			for ($y = 0; $y < (int)$_GET["num" . ($i + 1)]; $y++) {
				$tubeID = $tubeIDs[$y];
				echo $tubeID;
				$query = "UPDATE Tubes SET in_shipment=true, shipment_id=" . $id . " WHERE key_internal=" . $tubeID[0] . ";";
				$conn->exec($query);
				
				//While we're at it, put the updated tube into the tube_shipments table
				$query_shipment_tubes = "INSERT INTO `" . $db . "`.`Shipment_tubes` (`shipment_key_internal`,`tube_key_internal`) VALUES ('" . $id . "','" . $tubeID[0] . "');";
				echo "shipment_tubes query: " . $query_shipment_tubes;

				$conn->exec($query_shipment_tubes);
			}
			
		}
    }

	catch(PDOException $e){
		echo "add failed: " . $e->getMessage() . "<br>" . "<br>";
		return -1;
	}

?>
