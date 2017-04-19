$("document").ready(function(){

	//绑定侧栏菜单的事件
	$(".sidebar_trigger").click(function(){
		$("#sidebar").css("right","0px")
		$(".mask").show()
		console.log("lllll")
	})
	$(".mask").click(function(){
		$("#sidebar").css("right","-300px")
		$(".mask").hide()
	})

	//返回顶部部分
	$(window).scroll(function(){
		if($(window).scrollTop()>$(window).height())
			{
			  $(".backtop").show()
			}
		else {
			  $(".backtop").hide()
			}
	})

	$(".backtop").click(function(){
		$('body').animate({scrollTop:0})
	})
})