<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Enabling CORS

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});
    
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
    ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
    ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

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
