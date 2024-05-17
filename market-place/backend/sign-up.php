<?php
    include("db-config.php");

    $formdata = json_decode(file_get_contents("php://input"));

    // user profile
    $sql = "INSERT INTO profile_tb (firstname, middlename, lastname, email) VALUES (?, ?, ?, ?)";
    $stmt = $connect->prepare($sql);
    $stmt->execute([$formdata->firstname, $formdata->middlename, $formdata->lastname, $formdata->email]);

    // current profile_id
    $sql = "SELECT profile_id FROM profile_tb ORDER BY profile_id DESC LIMIT 1";
    $stmt = $connect->query($sql);
    $lastProfileId = $stmt->fetch(PDO::FETCH_ASSOC);

    // user account
    $middleName = strtoupper(substr($formdata->middlename, 0, 1));
    $defaultUserName = "$formdata->lastname, $formdata->firstname $middleName.";
    $sql = "INSERT INTO user_account_tb (username, profile_id) VALUES (?, ?)";
    $stmt = $connect->prepare($sql);
    $stmt->execute([$defaultUserName, $lastProfileId['profile_id']]);

    echo json_encode($lastProfileId);
?>