<?php

ini_set("display_errors",1);
include "connect.php";

	echo "In script";
	try{
		$db = "eehuruguayresearch_db";

		$query = "SELECT key_internal FROM Tubes WHERE sample_key_internal='" .
        $_GET["sample_key_internal"] . "';";
		
        $conn = connect();

    class x {
    }

        $stmt = $conn->prepare($query);
        $stmt->execute();

        echo $stmt->fetchAll(PDO::FETCH_CLASS, "x");

        $query = "INSERT INTO `eehuruguayresearch_db`.`
    }

	catch(PDOException $e){
		echo "add failed: " . $e->getMessage() . "<br>" . "<br>";
		return -1;
	}

?>
