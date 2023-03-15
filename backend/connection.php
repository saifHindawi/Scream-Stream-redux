<?php

header("Access-Control-Allow-Origin: *");

$dbsn = "localhost";
$username = "root";
$password = "";
$dbname = "redux";

$dsn ="mysql:host=$dbsn;dbname=$dbname";

try {
    $conn = new PDO($dsn, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $error){
    echo "Error : " . $error->getMessage();
}

?>