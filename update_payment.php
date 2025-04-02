<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $registration_id = intval($_POST['registration_id']);
    $transaction_id = $conn->real_escape_string($_POST['transaction_id']);
    $payment_status = $conn->real_escape_string($_POST['payment_status']);

    // Update payment status
    $sql = "UPDATE registrations 
            SET transaction_id = '$transaction_id', 
                payment_status = '$payment_status' 
            WHERE id = $registration_id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Payment status updated successfully'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Error: ' . $conn->error
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid request method'
    ]);
}

$conn->close();
?> 