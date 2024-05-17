<?php 
    include("db-config.php");
    
    $formdata = json_decode(file_get_contents("php://input"));

    // Check if there is enough stock
    $sql = "SELECT quantity FROM inventory_tb 
            INNER JOIN product_tb ON product_tb.product_id = inventory_tb.product_id
            WHERE product_tb.product_id = ?";
    $stmt = $connect->prepare($sql);
    $stmt->execute([$formdata->productId]);
    $productQuantity = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$productQuantity || $formdata->quantity > $productQuantity['quantity']) {
        // Calculate remaining stock
        $remainingStock = $productQuantity ? $productQuantity['quantity'] : 0;
        
        echo json_encode(["ok" => false, "message" => "Insufficient stock remaining. Remaining stock: " . $remainingStock]);
        exit;
    }

    
    // Check if the product already exists in the cart
    $sql = "SELECT * FROM cart_tb WHERE product_id = ? AND user_id = ? AND isDeleted = 0";
    $stmt = $connect->prepare($sql);
    $stmt->execute([$formdata->productId, $formdata->userId]);
    $existingCartItem = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingCartItem) {
        // Product already exists in the cart, update the quantity
        $newQuantity = $existingCartItem['quantity'] + $formdata->quantity;
        $sql = "UPDATE cart_tb SET quantity = ? WHERE product_id = ? AND user_id = ?";
        $stmt = $connect->prepare($sql);
        $stmt->execute([$newQuantity, $formdata->productId, $formdata->userId]);
        
        echo json_encode(["ok" => true, "message" => "Quantity updated for $formdata->productname in your cart!"]);
    } else {
        // Product does not exist in the cart, insert new record
        // Insert item into cart table
        $sql = "INSERT INTO cart_tb (product_id, quantity, account_id, image_product, user_id) VALUES (?, ?, ?, ?, ?)";
        $stmt = $connect->prepare($sql);
        $stmt->execute([$formdata->productId, $formdata->quantity, $formdata->sellerId, $formdata->imageProduct, $formdata->userId]);

        echo json_encode(["ok" => true, "message" => "$formdata->productname has been successfully added to your cart!"]);
    }
?>
