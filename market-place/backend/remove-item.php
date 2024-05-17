<?php   
    include("db-config.php");
    
    $formdata = json_decode(file_get_contents("php://input"));
    $sql = "UPDATE cart_tb SET isDeleted = 1 WHERE product_id = ?";
    $stmt = $connect->prepare($sql);
    $stmt->execute([$formdata->productId]);

    echo "Item successfully marked as not deleted in cart";
?>
