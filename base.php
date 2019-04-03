<?php

	require_once "sample.php";
	$conn;

	function connect(&$conn){
		$conn = new mysqli("localhost", "root", "password", "uruguay_schema", 3306);
		if (mysqli_connect_error()) {
			die("Connection failed: " . mysqli_connect_error());
		}
		echo "Connected successfully" . "<br>" . "<br>";
	}

	connect($conn); 

	/*-----------------------------------------------------------------*/

	$samples_arr = array(
		new Sample(array(
			'date_collected' => '2019-02-24',
			'density' => '1.0',
			'filter_paper' => '5'
		)),
		new Sample(array(
			'date_collected' => '2019-02-24',
			'density' => '2.0',
			'filter_paper' => '4'
		))
	);

	Sample::add_all($samples_arr);

?>