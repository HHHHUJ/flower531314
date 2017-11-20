<?php 
	// 获取注册传递的数据
	$username = $_REQUEST["username"];
	$password = $_REQUEST["password"];
	$email = $_REQUEST["email"];
	// 连接数据库服务器
	mysql_connect("localhost:3306", "root", "");
	// 选择数据库
	mysql_select_db("sqltest");
	// 创建添加的SQL语句
	$sql = "INSERT INTO flower1314 (username, password, email) VALUES ('$username', '$password', '$email')";
	// 执行SQL语句，返回执行结果的boolean值
	$result = mysql_query($sql);
	// 根据查询结果集判断
	if ($result) {
		echo '{"status":1, "message":"success"}';
	} else {
		echo '{"status":0, "message":"failed"}';
	}
	// 关闭数据库连接
	mysql_close();
 ?>