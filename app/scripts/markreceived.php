<?php

ini_set("display_errors",1);
include "connect.php";

	echo "In script";
	try{
		$query = "";
		$db = "eehuruguayresearch_db";
		$table = "Shipments_batch";
		
		//invariant: ONLY things sent via get are shipment ids!
		foreach ($_GET as $column => $value) {
			
			//mark the shipment received
			$query = "UPDATE Shipments_batch SET received=true WHERE key_internal=" . (int)$value . ";";

			$conn = connect();
			$conn->exec($query);

			//mark the tubes as once again available
			$query = "UPDATE Tubes SET in_shipment=false WHERE shipment_id=" . $value . ";";

			$conn->exec($query);
		}
    }

	catch(PDOException $e){
		echo "add failed: " . $e->getMessage() . "<br>" . "<br>";
		return -1;
	}

?>
