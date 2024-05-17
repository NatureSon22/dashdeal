<?php 
    include("db-config.php");

    // Decode the JSON data received from the frontend
    $input_data = file_get_contents("php://input");
    $form_data = json_decode($input_data);

    try {
        // Prepare the SQL statement to insert product information
        $sql_product = "INSERT INTO product_tb(productname, productdescription, productprice, category_id, account_id, `date`) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt_product = $connect->prepare($sql_product);
        $stmt_product->execute([$form_data->productname, $form_data->description, $form_data->price, $form_data->category, $form_data->userId, date("Y/m/d")]);

        // Get the last inserted product_id
        $productId = $connect->lastInsertId();

        // Prepare the SQL statement to insert image paths
        $sql_image = "INSERT INTO image_tb (image_path, product_id) VALUES (?, ?)";
        $stmt_image = $connect->prepare($sql_image);

        // Insert each image path into image_tb
        foreach ($form_data->imgPath as $val) {
            $stmt_image->execute([$val, $productId]);
        }

        // Add discount price
        if ($form_data->discountRate) {
            $discountedprice = $form_data->price - (($form_data->discountRate / 100) * $form_data->price);
            $sql_discount = "INSERT INTO discount_tb (discountrate, discountedprice, discountend, product_id) VALUES (?, ?, ?, ?)";
            $stmt_discount = $connect->prepare($sql_discount);
            $stmt_discount->execute([$form_data->discountRate, $discountedprice, $form_data->date, $productId]);
        }

        // Prepare the SQL statement to insert inventory information
        $sql_inventory = "INSERT INTO inventory_tb (product_id, quantity, account_id, `status`, datemodified) VALUES (?, ?, ?, ?, ?)";
        $status = $form_data->quantity == 0 ? "OUT_OF_STOCK" : ($form_data->quantity <= 2 ? "LOW_STOCK" : "IN_STOCK");
        $stmt_inventory = $connect->prepare($sql_inventory);
        $stmt_inventory->execute([$productId, $form_data->quantity, $form_data->userId, $status, date("Y-m-d")]);

        // Return success message
        echo json_encode(["success" => true, "message" => "Item successfully added!"]);
    } catch (PDOException $e) {
        // Handle database errors
        echo json_encode(["success" => false, "message" => "Error: " . $e->getMessage()]);
    }
?>
