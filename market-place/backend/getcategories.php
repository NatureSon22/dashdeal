<?php 
    include("db-config.php");

    $sql = "SELECT * FROM category_tb";
    $stmt = $connect->prepare($sql);
    $stmt->execute();

    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($categories);
?>