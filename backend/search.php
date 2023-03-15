<?php
require "connection.php";

header("Access-Control-Allow-Origin:*");

header("Content-type: application/json ; charset=UTF-8");

header("Access-Control-Allow-Methods:*");

header("Access-Control-Max-Age:3600:*");

header("Access-Control-Allow-Headers:*");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET' :


        $sql = "SELECT id , description FROM novels";
        $path = explode('/',$_SERVER['REQUEST_URI']);
        $searchAbout = $path[5];
        $searchResult = [];
        $stmt =$conn->prepare($sql);
        $stmt->execute();
        while($novels = $stmt->fetch(PDO::FETCH_ASSOC)){
            if(strpos(strtolower($novels['description']) , strtolower($searchAbout)) !=false ){
                array_push($searchResult , $novels['id']);
            }
        }

        if($searchResult != []){
            $where_in = implode(',', $searchResult);
    
            $sql = "SELECT * FROM `novels` WHERE id IN ($where_in)" ;
            $query = $conn->prepare($sql);
            $query->execute();
            $results = $query->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($results);
            break;
        } else {
            $sql = "SELECT * FROM `novels`" ;
            $query = $conn->prepare($sql);
            $query->execute();
            $posts = $query->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($posts);
            break;
        }
}