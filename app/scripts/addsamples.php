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
        $aliquots;

		foreach ($_GET as $column => $value) {
			$columns_string = $columns_string . "`" . $column . "`" . ', ';
			$values_string = $values_string . "'" . $value . "'" . ', ';
            if ($column == "aliquots") {
                $aliquots = (int)$value;
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
        //Now, add tubes
        $query = "";
        $table = "Tubes";

        for ($x = 0; $x < $aliquots; $x++) {
            $query = "INSERT INTO `" . $db . "`.`" . $table . "` " .
            "(`sample_key_internal`) VALUES ('" . $id . "')";

            echo $query . "<br>";

            $conn->exec($query);
        }
    }

	catch(PDOException $e){
		echo "add failed: " . $e->getMessage() . "<br>" . "<br>";
		return -1;
	}

?>
