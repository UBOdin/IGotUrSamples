<html>
<body>

<?php

	require_once "../Functions_PDO/connect.php";
	require_once "../Functions_PDO/deplete.php";
	require_once "../Functions_PDO/retrieve_all.php";

	/*-----------------------------------------------------------------*/

	$connect = connect("localhost", "root", "password", "uruguay_schema"); 

	deplete($_POST['delete_ids'], $connect);
	$result = retrieve_all('Tubes', $connect);
	echo $result;

?>

</body>
</html>