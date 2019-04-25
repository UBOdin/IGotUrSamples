<?php

	include 'secrets.php';

//	$host = $_GET["host"];
//	$user = $_GET["user"];
//	$password = $_GET["password"];
//	$db_name = $_GET["db_name"];

	echo "This message appears whether successfully connected or not.";

	$conn = mysqli_connect("tethys.cse.buffalo.edu","blakecoo",$password,"eehuruguayresearch_db");

//	echo mysqli_connect_errno() . mysqli_connect_error();
	echo "This comes after.";
//	if (!$conn) {
//		echo "MySQL connect error";
//	} else {
//
//	echo "connect success" . "<br>" . "<br>";
//	}
?>
