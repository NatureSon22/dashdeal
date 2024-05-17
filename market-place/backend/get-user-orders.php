<?php 
    include("db-config.php");

    $userId = $_GET["userId"];

    $sql = "SELECT * FROM order_table WHERE userId = ?";
    $stmt = $connect->prepare($sql);
    $stmt->execute([$userId]);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);
?>