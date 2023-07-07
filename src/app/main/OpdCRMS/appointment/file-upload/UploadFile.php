
<?php
   
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
         
    $folderPath = "upload/";
       
    $file_names = $_FILES["file"]["name"];
    for ($i = 0; $i < count($file_names); $i++) {
        $file_name=$file_names[$i];
        $extension = end(explode(".", $file_name));
        $original_file_name = pathinfo($file_name, PATHINFO_FILENAME);
        $file_url = $original_file_name . "-" . date("YmdHis") . "." . $extension;
        move_uploaded_file($_FILES["file"]["tmp_name"][$i], $folderPath . $file_url);
    }
   
?>