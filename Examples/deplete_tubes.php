<html>
<body>

<?php

	require_once "../functions.php";
	connect("localhost", "root", "password", "uruguay_schema", 3306); 

	/*-----------------------------------------------------------------*/

	deplete_tubes($_POST['delete_ids']);

?>

</body>
</html>