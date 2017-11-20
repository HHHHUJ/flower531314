$(function(){
	$('header').load('header.html')//加个回调函数
	$('footer').load('footer.html')
	
	var oBold = $('.bold');
	//点击展开分类筛选
	oBold.bind("click",function(){
			if($(this).text()=='-'){
				$(this).siblings('ul').stop(true).slideUp("slow",function(){
					$(this).siblings('i').html('+')
				})
			}
			if($(this).text()=='+'){
				$(this).siblings('ul').stop(true).slideDown("slow",function(){
					$(this).siblings('i').html('-')
				});
			}
		
	})
	//热销商品和热门收藏商品之间的转换
	var current = $('.current')
	var tabTop = $('.tab_top');
	var collectList = $('.collect_list');
	var salesList = $('.sales_list');
	tabTop.on('mouseover','a',function(){
		tabTop.find('a').attr('class','');
		$(this).attr('class','current');
		if($(this).attr('id')=='hot_sales'){
			salesList.css('display','none');
			collectList.css('display','block');
		}
		if($(this).attr('id')=='hot_collect'){
			salesList.css('display','block');
			collectList.css('display','none');
		}
	})
	//商品图标获得tips
	var panelList = $('.panel_list');
	panelList.on('mouseover','.col_img',function(){
		$(this).contip({
			    trigger: 'hover',//获得焦点时触发
			    align: 'right',//出现在元素的上方
			    bg: '#fff',
			    padding:4,
			    fade: 200,//淡入淡出
			    rise: 2,//tip的上下位子
			    html:'<img src="../imgs/tab_top.jpg"></img>',
				css:"border",
				v_size:8,
				v_pos:0.4
			  }).show();
		$('.contip').css({
			'border':'1px solid orange',
			'width':'100px',
			'height':'100px'
		})
		$('.contip').find('img').css({
			'width':'100%',
			'height':'100%'
		})
	})
	
	//放大镜的实现
	var leftBox = $('.left-box');
	var outerBox = $('.outerbox');
	var middleBox = $('.middle-box');
	var rightBox = $('.right-box');
	var closeWrap = $('.close_wrap');
	leftBox.on('click','img',function(){
		middleBox.css('display','none');
		rightBox.css('display','none');
		leftBox.attr('position','relative');
		leftBox.stop().animate({
			width:1200,
			height:540
		},100).css({
			'outline':'1px solid #ccc'
		});
		$(this).closest('.outerbox').css({
			'margin':'0 auto'
		}).stop().animate({
			width:450,
			height:450
		},100);
		closeWrap.css({
			'display':'block',
			'top':'-10px',
			'right':'-10px'
		})
		
	})
	closeWrap.click(function(){
		middleBox.css('display','block');
		rightBox.css('display','block');
		leftBox.removeAttr('position');
		leftBox.stop().animate({
			width:370,
			height:464
		},100).css('outline','none')
		$(this).siblings('.outerbox').css({
			'margin':'0'
		}).stop().animate({
			width:315,
			height:315
		},100);
		$(this).css('display','none')
	})
	
	
//加了一段原生js，只是之前写的轮播图效果
	var outerBox = document.querySelector(".outerbox");
	var middlePic = document.querySelector(".middlePic");
	var aA = document.querySelectorAll('.dir')
	var smallPic=document.querySelector('.smallPic');
	var smallImg = smallPic.children;
	var oLi = middlePic.children;
	var now = 0;
	var next = 0;
	
	//无缝切换
	function toImg(){
		move(oLi[now],{'opacity':0})
		move(oLi[next],{'opacity':100})
		now=next;
	}
	//点击左边
	aA[0].onclick=function(){
		if(next==0){
			next=oLi.length-1;
		}else{
			next--;
		}
		toImg();
	}
	aA[1].onclick=function(){
		if(next==oLi.length-1){
			next=0;
		}else{
			next++;
		}
		toImg();
	}
	//鼠标滑过下面的小图，大图相对应地滑动
	for(var i=0;i<smallImg.length;i++){
		smallImg[i].index=i;
		smallImg[i].onmouseover=function(){
			next = this.index;
			toImg();
			for(var j=0;j<smallImg.length;j++){
				smallImg[j].className='';
			}
			this.className='active';
		}
	}
//	var leftbox = document.querySelector('.left-box');
//	leftbox.onclick=function(e){
//		var e = e||event;
//		var target = e.target||e.srcElement;
//		if(target.tagName=='IMG'&&target.className=='largepic'){
//			target.parentNode.parentNode.parentNode.style.height=540+'px';
//			target.parentNode.parentNode.parentNode.style.width=1198+'px';
//			target.parentNode.parentNode.parentNode.style.position='relative';
//			target.parentNode.parentNode.
//		}
//	}
	
	//滑入大图时，左右按钮出现
//	for(var i=0;i<oLi.length;i++){
//		oLi[i].index=i;
//		oLi[i].onmouseover=function(){
//			aA[0].style.display='block';
//			aA[1].style.display='block';
//		}
//		oLi[i].onmouseout=function(){
//			aA[0].style.display='none';
//			aA[1].style.display='none';
//		}
//	}
//点击- + 改变商品数量
var oSignal = document.querySelector('.signal');
var txtCount=document.getElementById('txt-count');
oSignal.onclick=function(e){
	var e=e||event;
	var target = e.target||e.srcElement;
	var txtNum=parseInt(txtCount.value);
	if(target.className=='plus'){
		txtNum++;
		txtCount.value=txtNum;
	}
	if(target.className=='reduce'){
		if(txtNum<=1){
			txtNum=1;
		}else{
			txtNum--;
		}
		txtCount.value=txtNum;
	}
}

})

