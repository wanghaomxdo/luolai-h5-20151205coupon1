<?php 

	session_start();

	// for debug use $_GET["param"]
	// http://localhost/luolai-h5-20151205/db/updatescorebyplayer2.php?shaketime=3&score=30
    // $_SESSION['openid']   = 'x2zitjlK5QY7rH113wDe2f96ThUtOw';


	include_once 'connect.php';

	// params
	$player2openid     = $_SESSION['openid'];
	$player2shaketime  = $_GET['shaketime'];
	$score             = $_GET['score'];
	$data = array();

	if ($conn)
	{
		// insert user
		$query = "UPDATE user SET player2shaketime = $player2shaketime, score = $score WHERE player2openid = '$player2openid'";
		mysqli_query($conn , $query) or die("Error in query: $query. ".mysql_error());

		$query1 = "SELECT * FROM user WHERE player2openid = '$player2openid'";
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