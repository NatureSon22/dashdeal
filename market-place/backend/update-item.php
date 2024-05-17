<?php
    include("db-config.php");

    // Assuming JSON input is correctly formatted and received
    $formdata = json_decode(file_get_contents("php://input"));

    $sql = "UPDATE product_tb SET productname = ?, productprice = ?, productdescription = ?, category_id = ? WHERE account_id = ? AND product_id = ?";
    $stmt = $connect->prepare($sql);
    $stmt->execute([$formdata->productname, $formdata->price, $formdata->description, $formdata->category, $formdata->userId, $formdata->productId]);

    $discountedprice = $formdata->price - (($formdata->discountRate / 100) * $formdata->price);

    

    if (isset($formdata->prevRate)) {
        $sql = "UPDATE discount_tb SET discountrate = ?, discountedprice = ?, discountend = ? WHERE product_id = ?";
        $stmt = $connect->prepare($sql);
        $stmt->execute([$formdata->discountRate, $discountedprice, $formdata->date, $formdata->productId]);
    } else {
        $sql = "INSERT INTO discount_tb (product_id, discountrate, discountedprice, discountend) VALUES (?, ?, ?, ?)";
        $stmt = $connect->prepare($sql);
        $stmt->execute([$formdata->productId, $formdata->discountRate, $discountedprice, $formdata->date]);
    }

    $status = $formdata->quantity == 0 ? "OUT_OF_STOCK" : ($formdata->quantity <= 2 ? "LOW_STOCK" : "IN_STOCK");
    $sql = "UPDATE inventory_tb SET quantity = ?, account_id = ?, `status` = ?, datemodified = ? WHERE product_id = ?";
    $stmt = $connect->prepare($sql);
    $stmt->execute([$formdata->quantity, $formdata->userId, $status, date("Y-m-d"), $formdata->productId]);

    echo json_encode("updated successfully");
?>
