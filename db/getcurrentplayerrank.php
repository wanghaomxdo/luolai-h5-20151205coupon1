<?php 

	// for debug
	// http://localhost/luolai-h5-20151205/db/getcurrentplayerrank.php
 	// $_SESSION['openid'] = 'o1zitjlK5QY7rH113wDe2f96ThUtOw';

	session_start();

	include_once 'connect.php';

	$openid = $_SESSION['openid'];
	$data = array();

	if ($conn)
	{
		// insert score
		$query = "SELECT * FROM user WHERE player1openid = '$openid' OR player2openid = '$openid'";
		$rs_query = mysqli_query($conn , $query) or die("Error in query: $query. ".mysql_error());
		if($rs_query->num_rows > 0)
		{
			$rs = mysqli_fetch_object($rs_query);
			$data[1] = $rs->player1openid;
			$data[2] = $rs->player1headimgurl;
			$data[3] = $rs->player1nickname;
			$data[4] = $rs->player2openid;
			$data[5] = $rs->player2headimgurl;
			$data[6] = $rs->player2nickname;
			$data[7] = $rs->score;
		}

		$query2 = "SELECT player1openid, player2openid FROM user WHERE score != 'NULL' order by score";
		$rs_query2 = mysqli_query($conn , $query2) or die("Error in query: $query. ".mysql_error());
		if($rs_query2->num_rows > 0)
		{
			if($rs_query2->num_rows == 1)
			{
				$data[0] = 1;
			}
			else
			{
				$i = 0;
				while($row = mysqli_fetch_array($rs_query2)) {
					$i++;

			    	if($row['player1openid'] == $openid || $row['player2openid'] == $openid)
					{

				  		$data[0] = $i;
				  		break;
					}
				}
			}
		}

		$json_data = '['.json_encode($data).']';

	}else
	{
		$json_data = json_encode('[]');
	}

	mysqli_close($conn);
	
	echo $json_data;
 ?>
