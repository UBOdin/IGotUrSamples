<?php

function connect($host, $user, $password, $db_name){

	try {
	    $conn = new PDO("mysql:host=$host;dbname=$db_name", $user, $password);
	    // set the PDO error mode to exception
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    echo "Connected successfully" . "<br>" . "<br>" ; 
	    return $conn;
	 }
	catch(PDOException $e){
	    echo "Connection failed: " . $e->getMessage();
	}

}

?>