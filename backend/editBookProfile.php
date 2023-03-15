<?php
require "connection.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");


$method = $_SERVER['REQUEST_METHOD'];


switch($method){
    case "POST":
        $title = $_POST["title"];
        $auther = $_POST['auther'];
        $description = $_POST['description'];
        $path = explode('/' , $_SERVER['REQUEST_URI']);
        $book_id = $path[5];
        if($_FILES["file"] == null){
        $file = "";
        } else {
            $file = $_FILES["file"] ;
        }
        if( ($_POST["title"] == 'undefined') ){
            $title = "";
        }
   
        if($_POST["auther"] == 'undefined'){
            $auther = "";
        }
        if($_POST["description"] == 'undefined'){
            $description = "";
        }

        if($file != ""){
            $targetDir = "../src/images/";
            $fileName = basename($file["name"]);
            $targetPath = $targetDir . $fileName;
        
            if (move_uploaded_file($file["tmp_name"], $targetPath)) {
            echo "File uploaded successfully";
                $sql = "UPDATE novels SET "; 
                if($title != ""){$sql .= "name = ? , ";}
                if($auther != ""){$sql .= " author = ? , ";}
                if($description != ""){$sql .= " description = ? , ";}
                $sql .= " image = ? WHERE id = ? ";
                $query = $conn->prepare($sql);
                $userArray = [$title  , $auther , $description];
                $updateArray = [];
                for($i=0 ; $i<=2 ; $i++){
                    if($userArray[$i] != ""){
                        array_push($updateArray ,$userArray[$i]);
                    }
                }
                array_push($updateArray ,$fileName);
                array_push($updateArray ,$book_id);
                print_r($updateArray);
                $query->execute([...$updateArray]);

                break;
            } else {
            echo "Error uploading file";
            }
        } else {
            $sql = "UPDATE novels SET"; 
                if($title != ""){$sql .= " name = ? ,";}
                if($auther != ""){$sql .= " author = ? ,";}
                if($description != ""){$sql .= " description = ? ,";}  
                $sql .= " WHERE id = ? ";
                $stmt = substr_replace($sql,"",-15 , -14);
                $query = $conn->prepare($stmt);
                $userArray = [$title , $auther , $description];
                $updateArray = [];
                for($i=0 ; $i<=2 ; $i++){
                    if($userArray[$i] != ""){
                        array_push($updateArray ,$userArray[$i]);
                    }
                }
                array_push($updateArray ,$book_id);
                $query->execute([...$updateArray]);
            break;
        }
}