<?php 

	session_start();

	// for debug use $_GET["param"]
	// http://localhost/luolai-h5-20151205/db/updateplayer2toready.php?isready=1
    // $_SESSION['openid'] = 'x2zitjlK5QY7rH113wDe2f96ThUtOw';
    // $player1isready     = $_GET['isready'];


	include_once 'connect.php';

	// params
	$player2openid     = $_SESSION['openid'];
	$player2isready    = $_POST['isready'];

	if ($conn)
	{
		// insert user
		$query = "UPDATE user SET player2isready = $player2isready WHERE player2openid = '$player2openid'";
		mysqli_query($conn , $query) or die("Error in query: $query. ".mysql_error());
	}else
	{
		echo 'database is disconnect!';
	}

	mysqli_close($conn);
?>﻿