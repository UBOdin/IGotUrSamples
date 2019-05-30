<html>
<body>

<?php

	require_once "../Functions/connect.php";
	require_once "../Functions/deplete.php";
	require_once "../Functions/retrieve_all.php";

	/*-----------------------------------------------------------------*/

	$connect = connect("localhost", "root", "password", "uruguay_schema", 3306); 

	deplete($_POST['delete_ids'], $connect);
	$result = retrieve_all('Tubes', $connect);
	echo $result;

?>

</body>
</html>