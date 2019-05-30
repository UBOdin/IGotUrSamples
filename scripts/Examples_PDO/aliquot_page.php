<html>
<body>

<?php

	require_once "../Functions_PDO/connect.php";
	require_once "../Functions_PDO/aliquot.php";
	require_once "../Functions_PDO/retrieve_all.php";

	/*-----------------------------------------------------------------*/

	$connect = connect("localhost", "root", "password", "uruguay_schema");

	aliquot($_POST['aliquots'], $_POST['sample_id'], $connect);
	$result = retrieve_all('Tubes', $connect);
	echo $result;
	
?>

</body>
</html>