
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

        //TODO: 
        for ($x = 0; $x < $_GET["samples"]; $x++) {
            for ($j = 0; $j < $_GET["num" . j]; $j++) {
               //UPDATE Tubes SET inShipment = true, shipmentID = $id WHERE  
            }
        }
        //for every sample added
        //for number of tubes needed
        //Get ALL tubes from sample not marked for shipment

        //mark for shipment
        //add id to shipment

    }

	catch(PDOException $e){
		echo "add failed: " . $e->getMessage() . "<br>" . "<br>";
		return -1;
	}

?>
