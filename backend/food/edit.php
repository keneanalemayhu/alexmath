<!-- backend/food/edit.php -->

<?php
header('Content-Type: application/json');
require_once('../db.php');

$data = json_decode(file_get_contents('php://input'), true);

$id = intval($data['id'] ?? 0);
$name = trim($data['name'] ?? '');
$price = intval($data['price'] ?? 0);

if ($id <= 0 || $name === '' || $price <= 0) {
  echo json_encode(['success' => false, 'message' => 'Invalid input']);
  exit;
}

$name = $conn->real_escape_string($name);
$sql = "UPDATE foods SET name = '$name', price = $price WHERE id = $id";

if ($conn->query($sql)) {
  echo json_encode(['success' => true]);
} else {
  echo json_encode(['success' => false, 'message' => 'Update failed']);
}
?>