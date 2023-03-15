<?php
require "connection.php";

header("Access-Control-Allow-Origin:*");

header("Content-type: application/json ; charset=UTF-8");

header("Access-Control-Allow-Methods:*");

header("Access-Control-Max-Age:3600:*");

header("Access-Control-Allow-Headers:*");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'POST' :
        $users = json_decode(file_get_contents('php://input'));

        $email = $users->email;
        
        $oldData="SELECT * FROM users WHERE email = '$email' ";
        $stmt = $conn->prepare($oldData);
        $stmt->execute();
        $checkEmail = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if($checkEmail == []){
            $sql = "INSERT INTO users (name , email , password)
                    VALUES (  ? , ? , ?)" ;
            $query = $conn->prepare($sql);
            $query->execute([$users->name , $users->email , $users->password]);

            $stmt2 = "SELECT * FROM users WHERE email = '$email'";
            $query2 = $conn->prepare($stmt2);
            $query2->execute();
            $getData = $query2->fetch(PDO::FETCH_ASSOC);
            echo json_encode(['name'=>$getData['name'] , 'id'=>$getData['id'] , 'email'=>$getData['email'] ]);
        } else {
            echo 'Your Email is Already Exist';
        }
        break;

}