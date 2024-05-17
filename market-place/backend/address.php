<?php
    include("db-config.php");

    $input_data = file_get_contents("php://input");
    $form_data = json_decode($input_data);

    try {
        $sql = "SELECT * FROM address_tb WHERE account_id = ?";
        $stmt = $connect->prepare($sql);
        $stmt->execute([$form_data->accountId]);
        $addressExists = $stmt->fetch();

        if ($addressExists) {
            $sql = "UPDATE address_tb SET streetaddress = ?, city = ?, zip = ?, phonenumber = ?, `type` = ? WHERE account_id = ?";
            $stmt = $connect->prepare($sql);
            $stmt->execute([$form_data->streetAddress, $form_data->city, $form_data->zip, $form_data->phoneNumber, $form_data->type, $form_data->accountId]);
        } else {
            $sql = "INSERT INTO address_tb (streetaddress, city, zip, phonenumber, `type`, account_id) VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $connect->prepare($sql);
            $stmt->execute([$form_data->streetAddress, $form_data->city, $form_data->zip, $form_data->phoneNumber, $form_data->type, $form_data->accountId]);
        }

        echo json_encode("Address successfully saved!");
    } catch (PDOException $e) {
        echo json_encode("Error: " . $e->getMessage());
    }
?>
