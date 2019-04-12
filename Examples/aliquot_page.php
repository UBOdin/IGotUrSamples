<html>
<body>

<?php

	require_once "../Functions/connect.php";
	require_once "../Functions/aliquot.php";
	require_once "../Functions/retrieve_all.php";

	/*-----------------------------------------------------------------*/

	$connect = connect("localhost", "root", "password", "uruguay_schema", 3306);

	aliquot($_POST['aliquots'], $_POST['sample_id'], $connect);
	$result = retrieve_all('Tubes', $connect);
	echo $result;
	
?>

</body>
</html>