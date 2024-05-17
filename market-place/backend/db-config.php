<?php 
    header("Access-Control-Allow-Origin:* ");
    header("Access-Control-Allow-Headers:* ");
    header("Access-Control-Allow-Methods:* ");

    try {
        $connect = new PDO("mysql:host=127.0.0.1;dbname=db_market_app", "root", "");
        $connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
?>