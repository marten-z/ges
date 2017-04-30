<?php

require_once './config.php';


if($_SERVER['REQUEST_METHOD'] === 'GET') {

    if($_GET['entity'] === 'categories') {
        header('Content-type: application/json');
        echo json_encode(DEFAULT_CATEGORIES);
        exit;
    }
}

http_response_code(400); // Missing parameters, return 400 Bad request
header('Content-type: application/json');
echo json_encode(array());
exit;

?>
