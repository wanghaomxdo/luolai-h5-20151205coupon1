<?php 
    $mysql_server_name='localhost'; 
    $mysql_username='luolai151205cp'; 
    $mysql_password='luolai151205cp';
    $mysql_database='luolai151205cp';
  
    $conn = mysqli_connect($mysql_server_name, $mysql_username, $mysql_password,$mysql_database);
    if($conn)
    	mysqli_query($conn,"SET NAMES 'utf8'");


    date_default_timezone_set("Asia/Shanghai");
?>