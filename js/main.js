$("document").ready(function(){

	//绑定侧栏菜单的事件
	$(".sidebar_trigger").click(function(){
		$("#sidebar").css("right","0px")
		$(".mask").show()
		$(".main-wrapper").css("filter","blur(1px)")
		console.log("lllll")
	})
	$(".mask").click(function(){
		$("#sidebar").css("right","-300px")
		$(".mask").hide()
		$(".main-wrapper").css("filter","blur(0px)")
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