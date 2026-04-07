<?php
// Run this file once to create the posts table
require_once 'config.php';

$conn = getDBConnection();

// Create posts table
$sql = "CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    content LONGTEXT NOT NULL,
    excerpt TEXT,
    thumbnail VARCHAR(1000),
    category ENUM('thong-tin', 'huong-dan', 'su-kien', 'cap-nhat') DEFAULT 'thong-tin',
    tags VARCHAR(500),
    status ENUM('draft', 'published') DEFAULT 'draft',
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    published_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

if ($conn->query($sql) === TRUE) {
    echo json_encode([
        'success' => true,
        'message' => 'Table posts created successfully'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error creating table: ' . $conn->error
    ]);
}

$conn->close();
?>
