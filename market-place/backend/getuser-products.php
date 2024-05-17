<?php 
    include("db-config.php");

    $userId = $_GET["userId"];

    // Retrieve products
    // in here the product_id actually remains
    $sql_products = "SELECT *, product_tb.product_id FROM product_tb 
                    INNER JOIN user_account_tb ON product_tb.account_id = user_account_tb.account_id
                    INNER JOIN profile_tb ON user_account_tb.profile_id = profile_tb.profile_id
                    INNER JOIN inventory_tb ON inventory_tb.product_id = product_tb.product_id
                    LEFT JOIN discount_tb ON discount_tb.product_id = product_tb.product_id
                    WHERE user_account_tb.account_id = $userId AND isdeleted = 0";
    $stmt_products = $connect->prepare($sql_products);
    $stmt_products->execute();
    $products = $stmt_products->fetchAll(PDO::FETCH_ASSOC);

    // Retrieve images
    $sql_images = "SELECT product_tb.product_id, GROUP_CONCAT(image_tb.image_path) AS image_paths FROM product_tb
                    LEFT JOIN image_tb ON product_tb.product_id = image_tb.product_id
                    WHERE image_tb.image_path IS NOT NULL
                    GROUP BY product_tb.product_id";
    
    $stmt_images = $connect->prepare($sql_images);
    $stmt_images->execute();
    $images = $stmt_images->fetchAll(PDO::FETCH_ASSOC);
    //var_dump($images);

    // Map images to products
    $products_with_images = [];
    foreach ($products as $product) {
        $product_id = $product['product_id'];
        $product['image_paths'] = '';
        foreach ($images as $image) {
            if ($image['product_id'] == $product_id) {
                $product['image_paths'] = $image['image_paths'];
                break;
            }
        }
        $products_with_images[] = $product;
    }

    echo json_encode($products_with_images);

?>