<?php

class LoginController
{
    public function __construct(private LoginGateway $loginGateway)
    {
    }

    public function handleRequest(string $method): void
    {
        switch ($method) {
            case "POST":
                $this->login();
                break;
            default:
                http_response_code(405);
                echo "Method not allowed.";
                break;
        }
    }

    private function login(): void
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


        $email = $requestData['email'] ?? '';
        $password = $requestData['password'] ?? '';


        $result = $this->loginGateway->login($email, $password);

        echo json_encode(["message" => $result]);
    }
}
