<?php
	header("Access-Control-Allow-Origin:*");
	$username = $_REQUEST["username"];
	mysql_connect("localhost:3306","root","");
	mysql_select_db("sqltest");
	$sql = "SELECT count(*) FROM flower1314 WHERE username='$username'";
	$result = mysql_query($sql);
	if ($row = mysql_fetch_array($result)) {
		if ($row[0] == 1) 
			echo '{"status":0, "message":"exist"}';
		else
			echo '{"status":1, "message":"not exist"}';
	} else {
		echo '{"status":2, "message":"error"}';
	}
	mysql_close();
?>