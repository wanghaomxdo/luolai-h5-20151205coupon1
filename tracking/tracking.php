<?php 

	include_once '../db/connect.php';

	// ip address
	function get_ipaddress()
	{
		if (!empty($_SERVER["HTTP_CLIENT_IP"])){
		    $ip = $_SERVER["HTTP_CLIENT_IP"];
		}elseif(!empty($_SERVER["HTTP_X_FORWARDED_FOR"])){
		    $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
		}else{
		    $ip = $_SERVER["REMOTE_ADDR"];
		}

		return $ip;
	}

    /**
     * 获取设备操作系统
     * @return string
     */
    function getDeviceOS()
    {
        $agent = strtolower($_SERVER['HTTP_USER_AGENT']);
        if(strpos($agent, 'windows nt')) {
            $platform = 'windows';
        } elseif(strpos($agent, 'macintosh')) {
            $platform = 'mac';
        } elseif(strpos($agent, 'ipod')) {
            $platform = 'ipod';
        } elseif(strpos($agent, 'ipad')) {
            $platform = 'ipad';
        } elseif(strpos($agent, 'iphone')) {
            $platform = 'iphone';
        } elseif (strpos($agent, 'android')) {
            $platform = 'android';
        } elseif(strpos($agent, 'unix')) {
            $platform = 'unix';
        } elseif(strpos($agent, 'linux')) {
            $platform = 'linux';
        } else {
            $platform = 'other';
        }

        return $platform;
    }

	// params
	$ip    = get_ipaddress();
	$platform = getDeviceOS();
	$type  = $_POST['type'];
	$url   = $_POST['url'];
	date_default_timezone_set(PRC);
	$odate = date("Y-m-d H:i",time());

	if ($conn)
	{
		// insert to database
		$query = "INSERT INTO tracking (ip, platform, type, url, odate) VALUES('$ip', '$platform', '$type','$url','$odate')";
		mysqli_query($conn , $query) or die("Error in query: $query. ".mysql_error());  
	}else
	{
		echo 'database is disconnect!';
	}

	mysqli_close($conn);
?>﻿