<?php
    include("db-config.php");

    $formdata = json_decode(file_get_contents("php://input"));

    // user profile
    $sql = "SELECT profile_tb.profile_id FROM profile_tb INNER JOIN user_account_tb ON profile_tb.profile_id = user_account_tb.profile_id WHERE email = ? AND password = ?";
    $stmt = $connect->prepare($sql);
    $stmt->execute([$formdata->email, $formdata->password]);
    $userAccountId = $stmt->fetchColumn();
    
    if ($userAccountId) {
        echo json_encode(array("ok" => true, "account_id" => $userAccountId));
    } else {
        echo json_encode(array("ok" => false));
    }
?>
