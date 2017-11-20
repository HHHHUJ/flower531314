$(function(){
	var oI = $('.i');
	//点击展开分类筛选
	
	oI.bind("click",function(){
			if($(this).text()=='-'){
				$(this).siblings('ul').stop(true).slideUp("slow",function(){
					$(this).siblings('.i').html('+')
				})
			}
			if($(this).text()=='+'){
				$(this).siblings('ul').stop(true).slideDown("slow",function(){
					$(this).siblings('.i').html('-')
				});
			}
		
	})
	
		$('header').load('header.html')
		$('footer').load('footer.html')
		$.get("../flower.json", function(data){
			//鼠标滑过小图片,大图片变化,但是图片太多不想写太多json
			function smallToBig(){
				var oLi = $('.smallImg>ul>li');
				oLi.mouseover(function(e){
					var target = $(e.target)
					var dataId = target.closest('.item').find('.g-img>img');
					var smallSrc = $(this).find('img').attr('src');
					dataId.attr('src',smallSrc)
				})
			}
			
			//处理分页
			var btnList = $('.btnList');
			var first = $('.first');
			var last = $('.last');
			var prev = $('.prev');
			var after = $('.after');
			var afterAll = $('.after, .after_t');
			var prevAll = $('.prev, .prev_t');
			//每页设置24个数据
			var pagelen = 24;
			//总数据长度
			var len = data.length;
			//总共的页数
			var pagenums = Math.ceil(len/pagelen);
			for(var i=0;i<pagenums;i++){
				var a = $('<a href="##"></a>');
				a.attr('class','pages');
				a.html(i+1);
				after.before(a);
			}
			datapage(0);
			function datapage(n){
			//template简洁版不能用for循环，所以只能截取data数组的数据，再添加进artTemplate里
				var newData = data.slice(n*pagelen,Math.min(len,(n+1)*pagelen))
				var html = template("test", {products:newData});
				$(".flower_produce").html(html);
				smallToBig();
			};
			
			var now=1;
			var oPage = $('.pages')
			oPage.click(function(){
				datapage($(this).text()-1);
				//保留先来当前的页数
				now = $(this).text();
			})
			//点击上一页
			prevAll.bind('click',function(){
				if(now==1){
					return;
				}else{
					datapage(now-2)
					now--;
				}
			})
				
		
			
			//点击下一页
			afterAll.bind('click',function(){
				if(pagenums==now){
					return
				}else{
					datapage(now);
					now++;
				}
			})
				
			
			//点击首页
			first.click(function(){
				datapage(0);
			})
			//点击尾页
			last.click(function(){
				datapage(pagenums-1);
			})
			var fP = $('.flower_produce');
			var obj = {};
			var sum = 1;
			var str = '';
			fP.on('click',"._buy",function(){
				var numId = $(this).closest('.bigbox').attr('data-id')
				//实现购物车抛物线功能
				var _target = $(this).closest('.bigbox');
				var _startT = _target.offset().top-$(window).scrollTop();//抛物线起点
				var _startL = _target.offset().left;
				var _gouwucart = $('.gouwucart');
				var _endT = _gouwucart.offset().top-$(window).scrollTop();//抛物线终点
				var _endL = _gouwucart.offset().left;
				var aFly = $('<div class="fly"></div>');
				aFly.fly({
					  start: {top: _startT, left: _startL},
				      end: {top: _endT, left: _endL, width: 0, height: 0},
				      autoplay:false,
				      speed:1.1,
				      onEnd: function(){
				      }
				})
				
				//将商品的id存入obj
				if(obj[numId]==undefined){
					obj[numId]=sum;
					var index = parseInt(numId);
					//获取到点击商品的json，并将它转化成数组，模板里需用数组
					var newdata = data.slice(index-1,index);
					var _html = template('test02',{products02:newdata});
					str+=_html;
					$('.middleBox').html(str);
				}else{
					var sum2 = obj[numId];
					sum2++;
					obj[numId]=sum2;
					$('ul[data-id]').find('.numbers').html(sum2);
				}
				console.log(obj)
				//点击删除把这件商品从购物车移出
				$('.remove').click(function(){
					$(this).closest('.ul_list').remove();
				})
				//把商品信息的obj存入cookie
				var objstr = JSON.stringify(obj) 
				$.cookie('init',objstr,{expires:7})
			})
			
		});
	
	
})
