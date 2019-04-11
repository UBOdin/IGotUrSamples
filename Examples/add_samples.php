<html>
<body>

<?php

	$sample_columns_toy = array(
		'date_collected',
		'density',
		'filter_paper'
	);

	$tube_columns_toy= array(
		'sample_id'
	);

	require_once "../functions.php";

	/*-----------------------------------------------------------------*/

	connect("localhost", "root", "password", "uruguay_schema", 3306);

	//all_samples element in $_POST contains all dictionaries of samples
	foreach($_POST['all_samples'] as $sample_index => $samples_dict){

		//add the sample
		$id = add($sample_columns_toy, $samples_dict, 'Samples');

		//simoultaneously add the tubes associated with the sample to the Tubes table
		for($i = 0; $i < intval($samples_dict['aliquots']); ++$i){
			add($tube_columns_toy, array('sample_id' => $id), 'Tubes');
		}
	}
	
?>

</body>
</html>