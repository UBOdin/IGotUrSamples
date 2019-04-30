<?php

global $conn;

$query = "SELECT * FROM ";
$query = $query . $table;

$result = $conn->query($query);

$rows = mysqli_num_rows($result);
for($j=0 ; $j<$rows; ++$j){
  $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
  foreach($row as $index=>$val){
    echo $index . ": " . $val . "<br>";
  }
}

?>
