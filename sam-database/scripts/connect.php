<?php
	ini_set("display_errors",1);
	include "secrets.php";

function connect() {

	$host = "tethys.cse.buffalo.edu";
	$db_name = "eehuruguayresearch_db";
	$user = "blakecoo";
	$password = getPassword();

	try {
	    $conn = new PDO("mysql:host=$host;dbname=$db_name", $user, $password);
	    // set the PDO error mode to exception
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    return $conn;
	 }
	catch(PDOException $e){
	    echo "Connection failed: " . $e->getMessage();
	}

}

?>
