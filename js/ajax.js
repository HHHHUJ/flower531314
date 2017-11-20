function ajax(method,url,success,error){
	var xml = new XMLHttpRequest()||new ActiveXObject("Microsoft,XMLHTTP");
	//打开方式
	method = method.toUpperCase();//转换成大写的方式
	xml.open(method,url);
	//发送请求
	xml.send();
	//改变状态
	xml.onreadystatechange = function(){
		if(xml.readyState==4){
			if(xml.status==200){
				//成功回调函数
				success(xml.responseText);
			}else{
				//失败回调函数
				error(xml.status);
			}
		}
	}
}

function ajaxPost(url,json,success,error){
	var xml = new XMLHttpRequest()||new ActiveXObject("Microsoft,XMLHTTP");
	xml.open("POST",url);

	xml.setRequestHeader("content-type","application/x-www-form-urlencoded");
	var dataStr = '';
	for(var key in json){
		if(dataStr){
			dataStr+="&";
		}
		dataStr+=key+"="+json[key];
	}
	xml.send(dataStr);

	xml.onreadystatechange = function(){
		if(xml.readyState==4){
			if(xml.status==200){
				//成功回调函数
				
				success(xml.responseText)
			}else{
				//失败回调函数
				error(xml.status)
			}
		}
	}
}

