<html>
<body>

<?php

	$batch_shipment_columns = array(
		'date',
		'shipping_company',
		'source',
		'destination'
	);

	$tube_shipment_columns = array(
		'tube_id',
		'shipment_id'
	);
	

	require_once "functions.php";
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

	$id = add($batch_shipment_columns, $_POST['batch'], 'Batch_Shipments');
	foreach($_POST['batch']['tubes'] AS $tube_index => $tube_dict){
		$tube_dict['shipment_id'] = $id;
		add($tube_shipment_columns, $tube_dict, 'Tube_Shipments');
	}

	retrieve_all('Tube_Shipments');
	
?>

</body>
</html>