window.onload=function(){
	setTimeout(function(){
		//最顶端的二级导航
	var oList = document.getElementById('list');
	var oDt=oList.getElementsByTagName('dt');
	var oDl=oList.getElementsByTagName('dl');
	var oDd=oList.getElementsByTagName('dd');

	for(var i=0;i<oDl.length;i++){
		oDl[i].index=i;
		oDl[i].onmouseover=function(){
			oDd[this.index].style.display='block';
		}
	}
	for(var j=0;j<oDl.length;j++){
		oDl[j].index=j;
		oDl[j].onmouseout=function(){
			oDd[this.index].style.display='none';
		}
	}

	var olis=document.getElementById('lis');
	var oLi=olis.children;
	var otxt=document.getElementById('txt');
	for(var i=0;i<oLi.length;i++){
		oLi[i].index=i;
		oLi[i].onclick=function(){
			for(var j=0;j<oLi.length;j++){
				oLi[j].className='';
			}
			this.className='goods';
			if(this.index==1){
				otxt.placeholder='请输入你要搜索的店铺关键字'
			}
			if(this.index==0){
				otxt.placeholder='请输入你要搜索的商品关键字'
			}
		}
	}

	//购物车二级菜单
	var gouwu=document.querySelectorAll('.gouwu');
	for(var i=0;i<gouwu.length;i++){
		gouwu[i].onmouseover=function(){
			var a = this.children[1];
			a.style.display='block';
		}
		gouwu[i].onmouseout=function(){
			var a = this.children[1];
			a.style.display='none';
		}
	}
	

	//导航栏
	var navlist=document.getElementById('navlist');	
	var aLi=navlist.children;
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			for(var j=0;j<aLi.length;j++){
				aLi[j].className='';
			}
			this.className='active';
		}
	}


//滚动时定位
//	window.onscroll=function(){
//		var setTop1 = document.getElementById('setTop');
//		var cHeight = document.documentElement.clientHeight||document.body.clientHeight;
//		sTop = document.documentElement.scrollTop||document.body.scrollTop;
//		
//		setTop1.style.top = sTop+(cHeight-setTop1.offsetHeight)/2+'px';
//		// 二级导航
//		// var oFind = document.getElementById('find');
//		// var oXiala = docuemnt.getElementById('xiala');
//
//	}
var setTop1 = document.getElementById('setTop');
var cHeight = document.documentElement.clientHeight||document.body.clientHeight;
setTop1.style.top=cHeight/2+'px';
//ajax动态添加
	$.get("flower.json",function(data){
		var oPic = document.querySelector('.pic');//商品详情的父元素
		var str="";
		for(var i=0;i<5;i++){
			str+='<dl class="comm" data-id='+data[i].id+'><dt><a href="##"><img src='+data[i].img[0]+
			'></a></dt><dd><p><a href="##">'+data[i].title+
			'</a></p><div>商城价:<span>'+data[i].price+
			'</span></div></dd></dl>';
		}
		oPic.innerHTML=str;
		var _img01 = document.querySelector('._img01');//商品详情的父元素
		var str="";
		for(var i=5;i<13;i++){
			str+='<dl class="comm comm1" data-id='+data[i].id+'><dt><a href="##"><img src='+data[i].img[0]+
			'></a></dt><dd><p><a href="##">'+data[i].title+
			'</a></p><div>'+data[i].price+'<span>'+data[i].ori_price+
			'</span></div></dd></dl>';	
		}
		_img01.innerHTML=str;

		var _img02 = document.querySelector('._img02');//商品详情的父元素
		var str="";
		for(var i=13;i<21;i++){
			str+='<dl class="comm comm1" data-id='+data[i].id+'><dt><a href="##"><img src='+data[i].img[0]+
			'></a></dt><dd><p><a href="##">'+data[i].title+
			'</a></p><div>'+data[i].price+'<span>'+data[i].ori_price+
			'</span></div></dd></dl>';	
		}
		_img02.innerHTML=str;

		var _img03 = document.querySelector('._img03');//商品详情的父元素
		var str="";
		for(var i=21;i<29;i++){
			str+='<dl class="comm comm1" data-id='+data[i].id+'><dt><a href="##"><img src='+data[i].img[0]+
			'></a></dt><dd><p><a href="##">'+data[i].title+
			'</a></p><div>'+data[i].price+'<span>'+data[i].ori_price+
			'</span></div></dd></dl>';	
		}
		_img03.innerHTML=str;

		var oLi =document.querySelectorAll('.comm1')
		var oLiAll = document.querySelectorAll('.comm');
		var len = oLi.length;
		//鼠标移入图片有淡入淡出效果
		for(var i=0;i<len;i++){
			oLi[i].index=i;
			oLi[i].onmouseover=function(){
				for(var j=0;j<oLi.length;j++){
					oLi[j].style.opacity=0.3;
				}
				this.style.opacity=1;
			}
			oLi[i].onmouseout=function(){
				for(var j=0;j<oLi.length;j++){
					oLi[j].style.opacity=1;
				}
			}
			
			//点击图片跳转到详情页
			
		}
		for(var j=0,len=oLiAll.length;j<len;j++){
			oLiAll[j].onclick=function(){
				var Id = this.getAttribute('data-id');
				location.href="html/pro-detail.html?id=Id";
			}
		}

	},"json")
	
	
	//点击首页navlist跳转到分页
	var oNavList = document.getElementById('navlist');
	
	oNavList.onclick=function(e){
		var e=e||event;
		var target=e.target||e.srcElement;
		if(target.tagName=='A'&&target.className=='flower_fastsend'){
			location.href="/flower531314/html/flowersend.html";//前面加斜线绝对路径
		}
		if(target.tagName=='A'&&target.className=='homePage'){
			location.href="/flower531314/index.html";
		}
	}
	//点击LOGO跳转到首页
	
	var Logo = document.querySelector('.logo');
	Logo.onclick = function(){
		location.href = "/flower531314/index.html"
	}
},50)
	
	
}