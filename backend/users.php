<?php
require "connection.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET' :
        
        $sql = "SELECT * FROM users" ;
        $path = explode('/' , $_SERVER['REQUEST_URI']);
        
        if(isset($path[4]) && !is_numeric($path[4])){
            $sql .= " WHERE email = ?";
            $query = $conn->prepare($sql);
            $query->execute([$path[4]]);
            $users = $query->fetch(PDO::FETCH_ASSOC);
        } else {
            $query = $conn->prepare($sql);
            $query->execute();
            $users = $query->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($users);
        break;

    case 'POST' :
        $users = json_decode(file_get_contents('php://input'));

        $email = $users->email;
        
        $oldData="SELECT * FROM users WHERE email = '$email' ";
        $stmt = $connect->prepare($oldData);
        $stmt->execute();
        $checkEmail = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if($checkEmail == []){
            $sql = "INSERT INTO users (  name , email , password)
                    VALUES ( ? , ? , ? )" ;
            $query = $connect->prepare($sql);
            $query->execute([$users->first_name , $users->last_name , $users->email , $users->password]);
        } else {
            echo 'Your Email is Already Exist';
        }
        break;


    case 'DELETE' :
        $sql = "DELETE FROM users WHERE email = ?" ;
        $path = explode('/' , $_SERVER['REQUEST_URI']);
        if(isset($path[2]) && is_numeric($path[2])){
            $query = $connect->prepare($sql);
            $query->execute([$path[2]]);
        }
        echo json_encode($users);
        break;
}