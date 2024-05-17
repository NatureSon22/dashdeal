<?php 
    include("db-config.php");
    $form_data = json_decode(file_get_contents("php://input"));    


    var_dump($form_data);


    $sql = "INSERT INTO order_table (imagepaths, imgproof, productId, productname, productprice, quantity, seller, sellerId, userId, deliverstatus, `status`, `date`)  
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $connect->prepare($sql);
    $stmt->execute([]);




?>