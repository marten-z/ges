<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("GET /");

    // Render index view, without content
    return $response->withStatus(204);
});

// Categories
require __DIR__ . '/../src/routes/categories.php';

// Products
require __DIR__ . '/../src/routes/products.php';
