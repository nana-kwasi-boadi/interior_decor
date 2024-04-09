
<?php

class ProductGateway

{
    private PDO $conn;
    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function getAll(): array
    {
        $sql = "SELECT * FROM products";

        try {
            $stmt = $this->conn->query($sql);

            if (!$stmt) {
                // Handle the case where the query execution failed
                throw new Exception("Failed to execute the SQL query");
            }

            $data = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $data[] = $row;
            }

            return $data;
        } catch (Exception $e) {
            echo $e;
            // Handle the exception (e.g., log it, return an empty array, etc.)
            // You can also re-throw the exception if you want to propagate it further.
            error_log($e->getMessage());
            return [];
        }
    }
}