<?php require_once("connection.php") ?>

<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");



$method = $_SERVER['REQUEST_METHOD'];


switch ($method) {
    case 'GET' :
        // echo('there');break;
        $sql = "SELECT * FROM `novels`" ;
        $query = $conn->prepare($sql);
        $query->execute();
        $posts = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($posts);
        break;
}