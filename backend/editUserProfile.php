<?php
require "connection.php";

header("Access-Control-Allow-Origin:*");

header("Content-type: application/json ; charset=UTF-8");

header("Access-Control-Allow-Methods:*");

header("Access-Control-Max-Age:3600:*");

header("Access-Control-Allow-Headers:*");

$method = $_SERVER['REQUEST_METHOD'];


switch($method){
    case "POST":
        $name = $_POST["name"];
        $password = $_POST['password'];
        $phone = $_POST['phone'];
        $path = explode('/' , $_SERVER['REQUEST_URI']);
        $email = $path[4];
        if($_FILES["file"] == null){
        $file = "";
        } else {
            $file = $_FILES["file"] ;
        }
        if( ($_POST["name"] == 'undefined') ){
            $name = "";
        }
   
        if($_POST["password"] == 'undefined'){
            $password = "";
        }
        if($_POST["phone"] == 'undefined'){
            $phone = "";
        }

        if($file != ""){
            $targetDir = "../src/images/";
            $fileName = basename($file["name"]);
            $targetPath = $targetDir . $fileName;
        
            if (move_uploaded_file($file["tmp_name"], $targetPath)) {
            echo "File uploaded successfully";
                $sql = "UPDATE users SET "; 
                if($name != ""){$sql .= "name = ? , ";}
                if($password != ""){$sql .= " password = ? , ";}
                if($phone != ""){$sql .= " mobile = ? , ";}
                $sql .= " image = ? WHERE email = ? ";
                $query = $conn->prepare($sql);
                $userArray = [$name  , $password , $phone];
                $updateArray = [];
                for($i=0 ; $i<=3 ; $i++){
                    if($userArray[$i] != ""){
                        array_push($updateArray ,$userArray[$i]);
                    }
                }
                array_push($updateArray ,$fileName);
                array_push($updateArray ,$email);
                print_r($updateArray);
                $query->execute([...$updateArray]);

                break;
            } else {
            echo "Error uploading file";
            }
        } else {
            $sql = "UPDATE users SET"; 
                if($name != ""){$sql .= " name = ? ,";}
                if($password != ""){$sql .= " password = ? ,";}
                if($phone != ""){$sql .= " mobile = ?,";}  
                $sql .= " WHERE email = ? ";
                $stmt = substr_replace($sql,"",-18 , -17);
                $query = $conn->prepare($stmt);
                $userArray = [$name , $password , $phone];
                $updateArray = [];
                for($i=0 ; $i<=3 ; $i++){
                    if($userArray[$i] != ""){
                        array_push($updateArray ,$userArray[$i]);
                    }
                }
                array_push($updateArray ,$email);
                $query->execute([...$updateArray]);
            break;
        }
}