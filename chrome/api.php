<?php

$response = array();
$dbhost = "localhost";
$dbusername = "dbusername";
$dbpassword = "dbpass";
$dbname = "dbname";

// check for required fields
if (isset($_GET['log'])) {

    $log = $_GET['log'];

    $con = mysqli_connect($dbhost,$dbusername,$dbpassword,$dbname);
    if (mysqli_connect_errno()){
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
      die();
    }

    // mysql inserting a new row
    $result = mysqli_query( $con,"INSERT INTO `chrome` VALUES($log)");

    // check if row inserted or not
    if ($result) {
        // successfully inserted into database
        $response["success"] = 1;
        $response["message"] = "Message successfully sent.";

        // echoing JSON response
        echo json_encode($response);
    } else {
        // failed to insert row
        $response["success"] = 0;
        $response["message"] = "Oops! An error occurred.";

        echo json_encode($response);
    }
} else {
    // required field is missing
    $response["success"] = 0;
    $response["message"] = "Required field(s) is missing";

    // echoing JSON response
    echo json_encode($response);
}
?>
