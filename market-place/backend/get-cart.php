<?php
    include("db-config.php");

    $userId = $_GET["userId"];

    $sql = "SELECT cart_id, account_id, product_id, image_product, SUM(quantity) AS total_quantity
            FROM cart_tb
            WHERE user_id = ? AND isDeleted = 0
            GROUP BY cart_id, account_id, product_id, image_product";
    $stmt = $connect->prepare($sql);
    $stmt->execute([$userId]);
    $cart_records = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $cart_info = array();

    // Get cart items info
    $sql = "SELECT username, productname, productdescription, productprice, discountedprice 
            FROM product_tb
            INNER JOIN user_account_tb ON product_tb.account_id = user_account_tb.account_id
            LEFT JOIN discount_tb ON discount_tb.product_id = product_tb.product_id
            WHERE user_account_tb.account_id = ? AND product_tb.product_id = ?";
    $stmt = $connect->prepare($sql);
    foreach ($cart_records as $record) {
        $account_id = $record['account_id']; 
        $product_id = $record['product_id'];
        $stmt->execute([$account_id, $product_id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Ensure cart_id is included in the merged data
        $merged_data = [...$record, ...$data, "cart_id" => $record["cart_id"]];
        $cart_info[] = $merged_data;
    }

    // Output cart info as JSON
    echo json_encode($cart_info);
?>
