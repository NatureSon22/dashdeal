<?php 
    include("db-config.php");

    $userid = $_GET["id"];
    $sql = "SELECT * FROM profile_tb INNER JOIN user_account_tb ON profile_tb.profile_id = user_account_tb.profile_id WHERE profile_tb.profile_id = ?";
    $stmt = $connect->prepare($sql);
    $stmt->execute([$userid]);
    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($data);
?>