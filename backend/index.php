<?php

# Declares strict types
declare(strict_types=1);

# Loads class files automatically
spl_autoload_register(function ($class) {
    require __DIR__ . "/src/$class.php";
});

// Set headers for CORS
header("content-type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow POST, GET, and OPTIONS requests
header("Access-Control-Allow-Headers: Content-Type"); // Allow Content-Type header

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}



header('Access-Control-Allow-Credentials', true);

set_error_handler("ErrorHandler::handleException");

$database = new Database("localhost", "interiorDecor", "root", "");
$productGateway = new ProductGateway($database);
$registerGateway = new RegisterGateway($database);
$loginGateway = new LoginGateway($database);

$productController = new ProductController($productGateway);
$registerController = new RegisterController($registerGateway);
$loginController = new LoginController($loginGateway);

$parts = explode("/", $_SERVER["REQUEST_URI"]);

if ($parts[2] === "home") {
    $productController->handleRequest($_SERVER["REQUEST_METHOD"]);
    exit;
}

if ($parts[2] === "register") {
    $registerController->handleRequest($_SERVER["REQUEST_METHOD"]);
    exit;
}

if ($parts[2] === "login") {
    $loginController->handleRequest($_SERVER["REQUEST_METHOD"]);
    exit;
}







