<!-- backend/food/list.php -->

<?php
header('Content-Type: application/json');
require_once('../db.php');

$sql = "SELECT id, name, price FROM foods ORDER BY id DESC";
$result = $conn->query($sql);

$foods = [];
while ($row = $result->fetch_assoc()) {
  $foods[] = $row;
}

echo json_encode($foods);
?>