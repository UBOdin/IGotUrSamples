<?php

if( isset($_POST['arguments']) ) {

	$conn;
	$table;

	$table = $_POST['table'][0];
	$conn = new mysqli($_POST['arguments'][0],$_POST['arguments'][1], $_POST['arguments'][2], $_POST['arguments'][3], $_POST['arguments'][4]);
	if (mysqli_connect_error()) {
		die("connect failed: " . mysqli_connect_error());
	}
	echo "connect success" . "<br>" . "<br>";
	retrieve_all($table, $conn);

}

function retrieve_all($table, $conn){

	$query = "SELECT * FROM ";
	$query = $query . $table;

	$result = $conn->query($query);
	$answer = array();
	$rows = mysqli_num_rows($result);
	for($j=0 ; $j<$rows; ++$j){
		$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
		$answer[] = $row;
	}
	return json_encode($answer);
}

?>
