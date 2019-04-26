<?php

include "secrets.php";
ini_set("display_errors",1);

function connect() {
	
	try {

		$conn = mysql_connect("tethys.cse.buffalo.edu","blakecoo",$password,"eehuruguayresearch_db");

	} catch (Exception $e) {
		echo "Exception caught! ", $e->getMessage(), "\n";
		exit;
	}

	return $conn;

}

?>
