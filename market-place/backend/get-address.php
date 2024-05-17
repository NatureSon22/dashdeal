<?php 
    include("db-config.php");

    $accountId = $_GET["id"];
    $type = $_GET["type"];

    $sql = "SELECT * FROM address_tb WHERE `type` = ? AND account_id = ?";
    $stmt = $connect->prepare($sql);
    $stmt->execute([$type, $accountId]);
    $addressData = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($addressData);

?>