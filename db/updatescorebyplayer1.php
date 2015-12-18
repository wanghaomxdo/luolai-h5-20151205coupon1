<?php 

	session_start();

	// for debug use $_GET["param"]
	// http://localhost/luolai-h5-20151205/db/updatescorebyplayer1.php?shaketime=3&score=30
    // $_SESSION['openid']   = 'o1zitjlK5QY7rH113wDe2f96ThUtOw';


	include_once 'connect.php';

	// params
	$player1openid     = $_SESSION['openid'];
    $player1shaketime     = $_GET['shaketime'];
    $score                = $_GET['score'];
	$data = array();

	if ($conn)
	{
		// insert user
		$query = "UPDATE user SET player1shaketime = $player1shaketime, score = $score WHERE player1openid = '$player1openid'";
		mysqli_query($conn , $query) or die("Error in query: $query. ".mysql_error());

		$query1 = "SELECT * FROM user WHERE player1openid = '$player1openid'";
		$rs_query1 = mysqli_query($conn , $query1) or die("Error in query: $query. ".mysql_error());
		if($rs_query1->num_rows > 0)
		{
			$rs = mysqli_fetch_object($rs_query1);
			$data["player1shaketime"] = $rs->player1shaketime;
			$data["player2shaketime"] = $rs->player2shaketime;
		}else
		{
			$data["player1shaketime"] = "0";
			$data["player2shaketime"] = "0";
		}
	}else
	{
		$data["player1shaketime"] = "0";
		$data["player2shaketime"] = "0";
	}

	$json_data = '['.json_encode($data).']';

	mysqli_close($conn);
	
	echo $json_data;
?>