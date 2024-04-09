<?php

class RegisterGateway
{
    private PDO $conn;

    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function registerUser(string $firstName, string $lastName, string $email, string $password, string $username, string $address, string $number ): string
    {
        
        $existingUserStmt = $this->conn->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
        $existingUserStmt->execute([$email]);
        $count = $existingUserStmt->fetchColumn();

        if ($count > 0) {
            return "User with this email already exists.";
        }

    
        $insertUserStmt = $this->conn->prepare("INSERT INTO users (username, email, first_name, last_name, home_address, phone_number, upass) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $result = $insertUserStmt->execute([$username, $email, $firstName, $lastName, $address, $number, password_hash($password, PASSWORD_DEFAULT)]);

        if ($result) {
            return "User registered successfully.";
        } else {
            return "Failed to register user.";
        }
    }
}
