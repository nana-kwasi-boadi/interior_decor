<?php

class RegisterController
{
    public function __construct(private RegisterGateway $registerGateway)
    {
    }

    public function handleRequest(string $method): void
    {
        switch ($method) {
            case "POST":
                $this->registerUser();
                break;
            default:
                http_response_code(405); 
                echo "Method not allowed.";
                break;
        }
    }

    private function registerUser(): void
    {
        $rawBody = file_get_contents("php://input");

        if (empty($rawBody)) {
            http_response_code(400); 
            echo json_encode(["error" => "Request body is empty"]);
            return;
        }

        $requestData = json_decode($rawBody, true);

        if ($requestData === null) {
            http_response_code(400); 
            echo json_encode(["error" => "Invalid JSON in request body"]);
            return;
        }

        $firstName = $requestData['firstName'] ?? '';
        $lastName = $requestData['lastName'] ?? '';
        $email = $requestData['email'] ?? '';
        $password = $requestData['confirmPassword'] ?? '';
        $userName = $requestData['userName'] ?? '';
        $address = $requestData['address'] ?? '';
        $number = $requestData['number'] ?? '';

        $result = $this->registerGateway->registerUser($firstName, $lastName, $email, $password, $userName, $address, $number);

        echo json_encode(["message" => $result]);
    }
}
