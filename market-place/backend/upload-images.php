<?php 
    include("db-config.php");

    if(isset($_FILES['product_image']) && !empty($_FILES['product_image']['name'][0])) {
        $upload_dir = "../src/assets/item-pics/"; // Upload directory

        // Check if upload directory exists, if not create it
        if(!is_dir($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }

        $uploaded_files = [];

        foreach($_FILES['product_image']['tmp_name'] as $key => $tmp_name) {
            $filename = $_FILES['product_image']['name'][$key];
            $temp_path = $_FILES['product_image']['tmp_name'][$key];
            $file_type = $_FILES['product_image']['type'][$key];
            $file_size = $_FILES['product_image']['size'][$key];

            $allowed_extensions = array("jpg", "jpeg", "png", "webp");
            $extension = pathinfo($filename, PATHINFO_EXTENSION);

            if(!in_array(strtolower($extension), $allowed_extensions)) {
                die("Error: Invalid image format. Please upload a JPEG or PNG");
            }

            $max_size = 1048576; // 1MB

            // Validate file size(optional)
            if($file_size > $max_size) {
                die("Error: Image size exceeds 1 MB limit.");
            }

            // Generate a unique filename
            $new_filename = uniqid() . "." . $extension; 
            $target_path = $upload_dir . $new_filename;

            // Move the uploaded file to the target directory
            if(move_uploaded_file($temp_path, $target_path)) {
                // File was successfully uploaded and moved
                // Now you can do further processing or save the file path to your database
                $uploaded_files[] = $target_path;
            } else {
                // Failed to move the uploaded file
                die("Error: Failed to save the uploaded image.");
            }
        }

        echo json_encode(["paths" => $uploaded_files]);
    } else {
        echo json_encode("Error: No images uploaded");
    }
?>
