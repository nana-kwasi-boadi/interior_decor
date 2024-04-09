<?php

class ProductController
{
    
    public function __construct(private ProductGateway $productGateway) {
        
    }

    public function handleRequest(string $method): void
    {
        $this->getProductsData($method);

    }

    private function getProductsData(string $method): void
    {
        switch ($method) {
            case "GET":
                echo json_encode($this->productGateway->getAll());
                break;
        }
    }
}