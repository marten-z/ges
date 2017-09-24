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
    $categories = $mapper->getCategories();
    
    return $response->withJson($categories, 200);
});

$app->get('/categories/{id}', function (Request $request, Response $response, array $args) {
    $category_id = (int) $args['id'];
    $this->logger->info("GET /categories/$category_id");
    
    $mapper = new CategoryMapper($this->db);
    $category = $mapper->getCategoryById($category_id);
    
    return $response->withJson($category, 200);
});
