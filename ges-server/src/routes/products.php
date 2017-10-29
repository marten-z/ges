<?php

use Slim\Http\Request;
use Slim\Http\Response;


$app->get('/products', function (Request $request, Response $response, array $args) {
    $this->logger->info("GET /products");
    
    $mapper = new ProductMapper($this->db);
    $products = $mapper->getAll();
    
    return $response->withJson($products, 200);
});
    
$app->get('/products/{id}', function (Request $request, Response $response, array $args) {
    $product_id = (int) $args['id'];
    $this->logger->info("GET /products/$product_id");
    
    $mapper = new ProductMapper($this->db);
    $product = $mapper->getById($product_id);
    
    return $response->withJson($product, 200);
});
        
$app->post('/products/new', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $product_data = [];
    $product_data['name'] = filter_var($data['name'], FILTER_SANITIZE_STRING);
    $product_data['category_id'] = (int) $data['categoryId'];
    
    if(strlen($product_data['name']) < 1 || !is_numeric($product_data['category_id'])) {
        return $response->withStatus(400);
    }
    
    $product = new ProductEntity($product_data);
    
    $mapper = new ProductMapper($this->db);
    try {
        $result = $mapper->create($product);
        return $response->withJson($result, 201);
    } catch (Exception $e) {
        return $response->withStatus(500);
    }
});
            
$app->put('/products/{id}', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();
    $product_data = [];
    $product_data['id'] = (int) $args['id'];
    $product_data['name'] = filter_var($data['name'], FILTER_SANITIZE_STRING);
    $product_data['category_id'] = (int) $data['categoryId'];
    
    if(!is_numeric($product_data['id']) || strlen($product_data['name']) < 1 || !is_numeric($product_data['category_id'])) {
        return $response->withStatus(400);
    }
    
    $product = new ProductEntity($product_data);
    
    $mapper = new ProductMapper($this->db);
    try {
        $result = $mapper->update($product);
        return $response->withJson($result, 202);
    } catch (Exception $e) {
        return $response->withStatus(500);
    }
});
                
$app->delete('/products/{id}', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();
    $product_data = [];
    $product_id = (int) $args['id'];
    
    if(!is_numeric($product_id)) {
        return $response->withStatus(400);
    }
    
    $mapper = new ProductMapper($this->db);
    try {
        $mapper->delete($product_id);
        return $response->withStatus(202);
    } catch (Exception $e) {
        return $response->withStatus(500);
    }
});
                