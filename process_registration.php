<?php
require_once 'config.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $full_name = $conn->real_escape_string($_POST['full_name']);
    $email = $conn->real_escape_string($_POST['email']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $amount = floatval($_POST['amount']);
    
    // Determine subscription type based on amount
    if ($amount == 1000) {
        $subscription_type = 'basic';
    } elseif ($amount == 5000) {
        $subscription_type = 'premium';
    } else {
        $subscription_type = 'custom';
    }

    // Insert into database
    $sql = "INSERT INTO registrations (full_name, email, phone, subscription_type, amount) 
            VALUES ('$full_name', '$email', '$phone', '$subscription_type', $amount)";

    if ($conn->query($sql) === TRUE) {
        $registration_id = $conn->insert_id;
        echo json_encode([
            'status' => 'success',
            'message' => 'Registration successful',
            'registration_id' => $registration_id
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