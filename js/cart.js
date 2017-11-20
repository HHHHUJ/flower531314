$(function(){
	$.get('../flower.json',function(data){
		var cookieData = JSON.parse($.cookie('init'));
		var str = '';
		for(var i=0,len=data.length;i<len;i++){
			for(var key in cookieData){
				var str1=data[i].price.slice(1);
				var summs = (Number(str1)*cookieData[key]).toFixed(2);
				if(data[i].id==key){
					str+=`<tr class="tr03 tr_goods" data-id=${data[i].id}>
						<td class="td01"><input type="checkbox"/></td>
						<td class="td02"><a href="##"><img src="../${data[i].img[0]}" style="height:40px;width:40px;"/></a></td>
						<td class="td03"><a href="##">${data[i].title}</a></td>
						<td class="td04"><span>${str1}</span></td>
						<td class="td05"> 
							<a href="##">-</a>
							<input type="text" value="${cookieData[key]}" class="numtxt"/>
							<a href="##">+</a>
						</td>
						<td class="td06"><span>${summs}</span></td>
						<td class="td07">
							<a href="##">收藏</a><br />
							<a href="##" class="del">删除</a>
						</td>
					</tr>`;
				}
			}
		}
		var oCart = $('table');
		$('.tr04').before(str)
		
			//点击加，减时，相应的数量发生变化
		var trGoods = $('.tr_goods')
		var totalPrice = $('#totalPrice');
		var storeTotal = $('#storeTotal');
		var Td05 = $('.tr_goods>.td05');
		var Tr = $('table>tbody>tr');
		Td05.on('click','a',function(){
			var tr = $(this).closest('.tr_goods')
			console.log(tr)
			if($(this).text()=='-'){
				var count = $(this).siblings('.numtxt').val();
				if(count<=1){
					count=1;
				}else{
					count--;
				}
				$(this).siblings('.numtxt').val(count);
				rowOnePrice(tr)
				total_price()
			}
			if($(this).text()=='+'){
				var count = $(this).siblings('.numtxt').val();
				count++;
				$(this).siblings('.numtxt').val(count);
				rowOnePrice(tr)
				total_price()
			}
		})
		//点击单选全选框
		var checkAll = $('.w01>input');//得到全选框
		var checks = $("input[type='checkbox']");//得到所有框
		checks.prop('checked',true);
		var checkOne = $('.tr_goods>.td01>input')//得到单选框
		checks.click(function(){
			
			if($(this).attr('id')=='checkall'){
				var states = $(this).prop('checked');
				checks.prop('checked',states)
			}
			if($(this).prop('checked')==false){
				checkAll.prop("checked",false)
			}
			
			total_price();
		})
		
		//计算单行的价格，以便实时更新
		function rowOnePrice(tr){
			
				var total=tr.children('.td06').find('span').html();//获取小计价格
				var Nums=tr.find('.numtxt').val();//获取数量
				var ori_price=tr.find('.td04>span').html();//获取单价
				tr.children('.td06').find('span').html((parseInt(ori_price)*Nums).toFixed(2));
			}
		//计算总价
		total_price();
		function total_price(){
				 var tol_price = 0;
				 $.each(Tr,function(i){
				 	if($(this).first().find('input').prop('checked')){
				 		var p = $(this).children('.td06').find('span').html();
				 		if(typeof p ==='string'){
				 			tol_price+=parseInt(p);
				 		}
				 	}
				 })
				 totalPrice.html(tol_price);
				 storeTotal.html(tol_price)
			}
		//删除这一行商品信息
		$('.del').click(function(){
			var sub = confirm('确认删除吗？');
			if(sub){
				$(this).parents('tr').remove();
			}
		})
	},'json')
	
	
	
	
})
