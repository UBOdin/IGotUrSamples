<?php

function connect($host, $user, $password, $db_name, $port){

	$conn;

	$conn = new mysqli($host, $user, $password, $db_name, $port);
	if (mysqli_connect_error()) {
		die("connect failed: " . mysqli_connect_error());
	}
	echo "connect success" . "<br>" . "<br>";
	return $conn;

}

?>