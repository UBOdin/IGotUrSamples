
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

			$columns_string = $columns_string . "`" . $column . "`" . ', ';
			$values_string = $values_string . "'" . $value . "'" . ', ';
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

        //TODO:
        for ($x = 0; $x < $_GET["samples"]; $x++) {
			//add all keys_internal for records matching the sample_key_internal of id(x+1) AND WHERE inshipment = false to the array
			$tubeIDs = array();
			$query = "SELECT key_internal FROM Tubes WHERE (sample_key_internal=" . $_GET["id" . (x + 1)] . ") AND (in_shipment=false);";
			$stmt = $conn->prepare($query);
			$stmt->execute();
			
			$tubeIDs.push($stmt->fetchAll(PDO::FETCH_CLASS, "x"));
			//for num(x+1)
			for ($y = 0; $y < (int)$_GET["num" . $x+1]; $y++) {
				//mark $tubeIDs[x] inshipment = true and shipmentid = id
				$query = "UPDATE Tubes SET in_shipment=true, shipment_id=" . $id . " WHERE key_internal=" . $tubeIDs[$y] . ";";
				$conn->exec($query);
			}
			
		}
    }

	catch(PDOException $e){
		echo "add failed: " . $e->getMessage() . "<br>" . "<br>";
		return -1;
	}

?>
