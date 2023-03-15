<?php
require "connection.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods:*");


    $email =  $_REQUEST['email'];
    $password = $_REQUEST['password'];


    try {
        $sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
    
        $stmt = $conn->query($sql);
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
    } catch (PDOException $error) {
        die($error->getMessage());
    }
     while ($row = $stmt->fetch()): 
            echo $row['email'];
     endwhile; 
     ?>