 $(function(){
        $("#header").load("./public/nav.html");
        $("#search").load("./public/seach.html");
        $("#footer").load("./public/footer.html");
        
        $(".normal-nav li").each(function(i){
        		$(this).on('mouseenter',function(){
        			$(this).addClass('selected');
        			$(".tab-main-content .tab-main-content-box").eq(i).css("display","block");
        		})
        });
        $(".normal-nav li").each(function(i){
        		$(this).on('mouseleave',function(){
				$(this).removeClass('selected');
				$(".tab-main-content .tab-main-content-box").eq(i).css("display","none");
        		})
        });
        
//      轮播图
		$(".banner-content").children().each(function(i){
			$(".banner-nav").append("<li></li>");
		})
		$(".banner-nav").children().eq(0).addClass("selected");	
		var timer = null;
		var Nowindex = 1;
		var play = null;
		$(".banner-nav li").each(function(i){
			$(this).hover(function(){
				clearInterval(play);
				Nowindex = i;
				++Nowindex>=$(".banner-content").children().length? Nowindex=0:Nowindex;
				let that = $(this);
				timer = setTimeout(function(){
					if(that.hasClass("selected")) {
						return;
					}
					$(".main-banner").eq(i).css({
						"zIndex":"2",
						"display":"block"
					})
					$(".main-banner").eq(i).animate({
						"opacity":"1",
						"zIndex":"1"
					},500)
					$(".main-banner").eq(i).siblings().animate({
						"opacity":"0",
						"display":"none",
						"zIndex":"0"
					},500)
					that.siblings().removeClass("selected");
					that.addClass("selected");
				},200)
			},function(){
				clearTimeout(timer);
				autoPlay();
		})
	})
	function autoPlay(){
		play = setInterval(function(){
			$(".main-banner").eq(Nowindex).css({
				"zIndex": "2",
				"display": "block"
			});
			$(".main-banner").eq(Nowindex).animate({
				"opacity": "1",
				"zIndex": "1"
			}, 500);
			$(".main-banner").eq(Nowindex).siblings().animate({
				"opacity": "0",
				"display": "none",
				"zIndex": "0"
			}, 500);
			$(".banner-nav li").eq(Nowindex).siblings().removeClass("selected");
			$(".banner-nav li").eq(Nowindex).addClass("selected");
			Nowindex++;
			Nowindex>=$(".banner-content").children().length? Nowindex=0:Nowindex;
		},2000)
	}
	
	$(".main-banner-content").hover(function(){
		clearInterval(play);
	},function(){
		autoPlay();
	})
	
	let branditemLength = 28;
	for (let i=0;i<branditemLength;i++){
		$(".brand-item-body").append($(".brand-item").first().clone(true))	;
	}
	
//滚动抵达相应高度后，只执行一次动画；
let isscroll = false;
let searchscroll = false;
	$(window).scroll(function(){
		if($(window).scrollTop()>600){
			if(isscroll === false){
				isscroll = true;
				$(".left-nav-wrapper").css({
					"display":"block"
				})
				$(".left-nav-wrapper").animate({
						"width":"100%",
						"height":$(".left-nav-list").height()+$(".nav-header").height(),
						"opacity":"1"
				})
			}
		}else if($(window).scrollTop()<500){
			if(isscroll === true){
				isscroll = false;
				$(".left-nav-wrapper").stop().animate({
						"width":"0",
						"height":"0",
						"opacity":"0"
				},400)
				setTimeout(function(){
					$(".left-nav-wrapper").css("display","none");
				},401)
			
			}
//			$(".left-nav-wrapper").css({
//				"display":"none"
//			})
		}
		
		if($(window).scrollTop()>1000){
			if(searchscroll === false){
				searchscroll = true;
				$(".total-container").css("top","0px");
				console.log("ok")	
			}
		}else if($(window).scrollTop()<800){
			if(searchscroll === true){
				searchscroll = false;
				$(".total-container").css("top","-50px");
			}
		}
		
	})
});