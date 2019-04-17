<?php

	$host = $_GET["host"];
	$user = $_GET["user"];
	$password = $_GET["password"];
	$db_name = $_GET["db_name"];

	echo "This message appears whether successfully connected or not.";

	$conn = mysqli_connect("tethys.cse.buffalo.edu","blakecoo","ChangeMe","eehuruguayresearch_db",3306);

	echo mysqli_connect_errno() . mysqli_connect_error();

	if (!$conn) {
		echo "MySQL connect error";
	} else {

	echo "connect success" . "<br>" . "<br>";
	}
?>
