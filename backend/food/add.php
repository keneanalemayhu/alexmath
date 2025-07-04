<!-- backend/food/add.php -->

<?php
header('Content-Type: application/json');
require_once('../db.php');

$data = json_decode(file_get_contents('php://input'), true);

$name = trim($data['name'] ?? '');
$price = intval($data['price'] ?? 0);

if ($name === '' || $price <= 0) {
  echo json_encode(['success' => false, 'message' => 'Invalid input']);
  exit;
}

$name = $conn->real_escape_string($name);
$sql = "INSERT INTO foods (name, price) VALUES ('$name', $price)";

if ($conn->query($sql)) {
  echo json_encode(['success' => true, 'id' => $conn->insert_id]);
} else {
  echo json_encode(['success' => false, 'message' => 'DB insert failed']);
}