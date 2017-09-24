<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("GET /");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

// Categories
$app->get('/categories', function (Request $request, Response $response, array $args) {
    $this->logger->info("GET /categories");
    
    $mapper = new CategoryMapper($this->db);
    $categories = $mapper->getAll();
    
    return $response->withJson($categories, 200);
});

$app->get('/categories/{id}', function (Request $request, Response $response, array $args) {
    $category_id = (int) $args['id'];
    $this->logger->info("GET /categories/$category_id");
    
    $mapper = new CategoryMapper($this->db);
    $category = $mapper->getById($category_id);
    
    return $response->withJson($category, 200);
});

$app->post('/categories/new', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    $category_data = [];
    $category_data['name'] = filter_var($data['name'], FILTER_SANITIZE_STRING);
    
    $category = new CategoryEntity($category_data);
    
    $mapper = new CategoryMapper($this->db);
    try {
        $mapper->create($category);        
        return $response->withStatus(201);
    } catch (Exception $e) {
        return $response->withStatus(500);
    }
});

$app->put('/categories/{id}', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();
    $category_data = [];
    $category_data['id'] = (int) $args['id'];
    $category_data['name'] = filter_var($data['name'], FILTER_SANITIZE_STRING);
    
    if(!is_numeric($category_data['id']) || strlen($category_data['name']) < 1) {
        return $response->withStatus(400);
    }
    
    $category = new CategoryEntity($category_data);
    
    $mapper = new CategoryMapper($this->db);    
    try {
        $mapper->update($category);
        return $response->withStatus(202);
    } catch (Exception $e) {
        return $response->withStatus(500);
    }
});

$app->delete('/categories/{id}', function (Request $request, Response $response, array $args) {
    $data = $request->getParsedBody();
    $category_data = [];
    $category_id = (int) $args['id'];
    
    if(!is_numeric($category_id)) {
        return $response->withStatus(400);
    }
    
    $mapper = new CategoryMapper($this->db);
    try {
        $mapper->delete($category_id);
        return $response->withStatus(202);
    } catch (Exception $e) {
        return $response->withStatus(500);
    }
});
