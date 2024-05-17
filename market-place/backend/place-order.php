<?php 
    include("db-config.php");
    $form_data = json_decode(file_get_contents("php://input"));    

    $sellerOrderIds = [];
    
    foreach ($form_data as $sellerId => $items) {
        try {
            // Calculate total for the seller
            $sellerTotal = 0;
            foreach ($items as $item) {
                $sellerTotal += $item->productprice * $item->quantity;
            }
        
            // Get the imgproof from the first item
            $imgProof = !empty($items[0]->imgproof) ? $items[0]->imgproof : null;
        
            //Insert order for the seller
            $sql = "INSERT INTO order_tb (orderdate, `status`, imgproof, total) VALUES (?, ?, ?, ?)";
            $stmt = $connect->prepare($sql);
            $stmt->execute([date("Y/m/d"), 'PENDING', $imgProof[0], $sellerTotal]);
            $orderId = $connect->lastInsertId(); // Get the last inserted order ID
        
            // Store the order ID for the seller
            $sellerOrderIds[$sellerId] = $orderId;
        
            // Insert order details for each item
            foreach ($items as $item) {
                $sql = "INSERT INTO order_detail_tb (cart_id, order_id) VALUES (?, ?)";
                $stmt = $connect->prepare($sql);
                $stmt->execute([$item->cartId, $orderId]);
            }
        } catch (PDOException $e) {
            // Handle database errors
            echo json_encode(["success" => false, "message" => "Error placing orders: " . $e->getMessage()]);
            exit; // Stop further execution
        }
    }
    
    // Update inventory quantity for each item
    foreach ($form_data as $sellerId => $items) {
        foreach ($items as $item) {
            try {
                $sql = "SELECT quantity FROM inventory_tb WHERE product_id = ?";
                $stmt = $connect->prepare($sql);
                $stmt->execute([$item->productId]);
                $currentQuantity = $stmt->fetch(PDO::FETCH_ASSOC)['quantity']; // Get current quantity

                $newQuantity = $currentQuantity - $item->quantity; // Calculate new quantity
                $sql = "UPDATE inventory_tb SET quantity = ? WHERE product_id = ?";
                $stmt = $connect->prepare($sql);
                $stmt->execute([$newQuantity, $item->productId]);
            } catch (PDOException $e) {
                // Handle database errors
                echo json_encode(["success" => false, "message" => "Error updating inventory: " . $e->getMessage()]);
                exit; // Stop further execution
            }
        }
    }

    echo json_encode(["success" => true, "message" => "Orders placed successfully!", "sellerOrderIds" => $sellerOrderIds]);
?>
