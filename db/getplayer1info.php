<?php 

	session_start();

	// for debug use $_GET["param"]
	// http://localhost/luolai-h5-20151205/db/getplayer1info.php?id=o1zitjlK5QY7rH113wDe2f96ThUtOw
    // $_SESSION['openid'] = 'x2zitjlK5QY7rH113wDe2f96ThUtOw';

	

	include_once 'connect.php';

	// params
	$player1openid     = $_GET['id'];
	$player2openid     = $_SESSION['openid'];
	
	$data = array();

	if ($conn)
	{
		$query2 = "SELECT * FROM user WHERE player1openid = '$player1openid' and player2openid = '$player2openid'";
		$rs_query2 = mysqli_query($conn , $query2) or die("Error in query: $query. ".mysql_error());
		if($rs_query2->num_rows > 0)
		{
			$rs2 = mysqli_fetch_object($rs_query2);
			$data["player1openid"] = $rs2->player1openid;
			$data["player1sex"] = $rs2->player1sex;
			$data["player1props"] = $rs2->player1props == null ? "" : $rs2->player1props;
			$data["player1isready"] = $rs2->player1isready == null ? 0 : $rs2->player1isready;
			$data["player2openid"] = $rs2->player2openid;
			$data["player2bed"] = $rs2->player2bed == null ? "" : $rs2->player2bed;
			$data["player2isready"] = $rs2->player2isready == null ? 0 : $rs2->player2isready;
			$data["score"] = $rs2->score == null ? 0 : $rs2->score;
			
		}
		
		$json_data = '['.json_encode($data).']';

	}else
	{
		$json_data = json_encode('[]');
	}

	mysqli_close($conn);
	
	echo $json_data;
?>