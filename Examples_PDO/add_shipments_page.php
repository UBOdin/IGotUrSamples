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
	
	require_once "../Functions_PDO/connect.php";
	require_once "../Functions_PDO/add.php";
	require_once "../Functions_PDO/retrieve_all.php";

	/*-----------------------------------------------------------------*/

	$connect = connect("localhost", "root", "password", "uruguay_schema");

	$id = add($batch_shipment_columns, $_POST['batch'], 'Batch_Shipments', $connect);
	foreach($_POST['batch']['tubes'] AS $tube_index => $tube_dict){
		$tube_dict['shipment_id'] = $id;
		add($tube_shipment_columns, $tube_dict, 'Tube_Shipments', $connect);
	}

	$result = retrieve_all('Batch_Shipments', $connect);
	echo $result;
	
?>

</body>
</html>