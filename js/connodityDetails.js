    
    let obj = "";
	$(function(){
        let arr = "";
        $(".comm_head").html(`
            <div class="pages_none"><div class='pages_none_d'><img src="img/8c2243a5df95d319a028290580fc960e.gif" alt="图片无法显示" class='pages_none_i'></div></div>
            `
        );
		let goodsId = location.search.split("=")[1];
		$.get("getGoodsInfo.php",{"goodsId":goodsId},function(data){
            obj = JSON.parse(data);
			let htmlStr=`
                    <div>您选择的</div><div class="comm_head_c">${obj.goodsName}</div>
                    `;
            let htmlStr1=`
                    <div class="comm_1">
                        <img src="${obj.goodsImg}" alt="">
                        <div>${obj.beiyong1}</div>
                        <div>库存:${obj.goodsCount}</div>
                        <div>评价:${obj.goodsDesc}</div>
                        <div>￥:${obj.goodsPrice}</div>
                        <a href="#" class="comm_1_j" onclick=onClickGou()>加入购物车 </a>
                    </div>
                    `;
            $(".comm_head").html(htmlStr);
            $(".comm_foot_dv2").html(htmlStr1);
        });
        $.get("commodityDetails.php",function(data){
            arr = JSON.parse(data);
            let htmlStr="";
            for(let i=0;i<arr.length;i++){
                htmlStr +=`
                    <div><span>${arr[i].goodstype}</span><p>${arr[i].goodsname}</p></div>
                `;
            }
            $(".pages_none").css({
                'display':'none'
            })
            $(".comm_foot_dv1").html(htmlStr);
        });
	})
    function onClickGou(){
        $.get("saveGoodss.php",obj);
        location.href="myshoppingcart.html";
    }