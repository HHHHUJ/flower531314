$(function(){
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
})
