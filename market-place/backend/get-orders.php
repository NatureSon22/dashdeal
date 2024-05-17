<?php
include("db-config.php");

$user_id = $_GET['userId']; // Assuming you have a session variable for the user_id

// Query to fetch orders for the user
$sql = "SELECT od.order_id, od.cart_id, od.product_id, od.quantity, od.account_id, od.image_product, od.user_id, 
               p.productname, p.productprice, p.productdescription
        FROM order_detail_tb od
        INNER JOIN product_tb p ON od.product_id = p.product_id
        WHERE od.cart_id IN (SELECT cart_id FROM cart_tb WHERE user_id = ?)";
$stmt = $connect->prepare($sql);
$stmt->execute([$user_id]);
$orderDetails = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Group order details by order ID
$groupedOrderDetails = [];
foreach ($orderDetails as $detail) {
    $order_id = $detail['order_id'];
    if (!isset($groupedOrderDetails[$order_id])) {
        $groupedOrderDetails[$order_id] = [];
    }
    $groupedOrderDetails[$order_id][] = $detail;
}

echo json_encode(["success" => true, "orderDetails" => $groupedOrderDetails]);
?>
