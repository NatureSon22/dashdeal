<?php 
    include("db-config.php");

    $formdata = json_decode(file_get_contents("php://input"));
    $sql = "UPDATE product_tb SET isdeleted = ? WHERE product_id = ?";
    $stmt = $connect->prepare($sql);
    $stmt->execute([1, $formdata->productid]);

    echo json_encode(["ok" => true, "message" => "Item has been successfully removed" ]); 
?>