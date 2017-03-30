(function(){
    var LightBox=function(){
        var self=this;
        imgWidth=$(".img_list img").width();
        imgNumber=$(".img_list img").size();
        allWidth=imgWidth*(imgNumber+1);
        console.log(allWidth);
        $(".img_list").width(allWidth);

        //给第一张图片添加class
        $(".img_list img:first").addClass("activeImg");
        for(var i=0;i<imgNumber;i++){
            $(".buttons").append("<div id='d"+i+"'></div>");
        }
        $("#d0").addClass("activeDiv");
        $(".buttons div:last").css({"marginRight":"0px"});
        // 下一句话需要绑定this，否则this将指向button
        $("#btnLeft").click(self.previousPic.bind(self));
        $("#btnRight").click(self.nextPic.bind(self));
        $(".buttons div").click(self.btnTab.bind(self));


        self.timer=self.startTimer();

    }

    LightBox.prototype={
        constructor:LightBox,
        nextPic:function(){
            var self=this;
            self.clearTimer(self.timer);
            var nI=$(".activeImg").index();
            var nD=$(".activeDiv").index();
            if(nI<imgNumber-1){
                $(".img_list").stop().animate({marginLeft:-imgWidth*(nI+1)},500,function(){
                    $(".img_list img").removeClass("activeImg");
                    $(".img_list img:eq("+(nI+1)+")").addClass("activeImg");
                    $(".buttons div").removeClass("activeDiv");
                    $(".buttons div:eq("+ (nD+1) +")").addClass("activeDiv"); 
                    self.timer=self.startTimer(); 
            });
            }else{
                $(".activeImg").after($(".img_list img:first").clone(true));
                $(".img_list").stop().animate({marginLeft:-imgWidth*(nI+1)},500,function(){
                    $(".img_list").css({marginLeft:0});
                    $(".img_list img:last").remove();

                    
                    $(".img_list img").removeClass("activeImg");
                    $(".img_list img:first").addClass("activeImg");
                    $(".buttons div").removeClass("activeDiv");
                    $(".buttons div:first").addClass("activeDiv");    
                    self.timer=self.startTimer();
             });
            }

        },
        previousPic:function(){
            var self=this;
            self.clearTimer(self.timer);
            var nI=$(".activeImg").index();
            var nD=$(".activeDiv").index();
            if(nI>0){
                $(".img_list").stop().animate({marginLeft:-imgWidth*(nI-1)},500,function(){
                    $(".img_list img").removeClass("activeImg");
                    $(".img_list img:eq("+(nI-1)+")").addClass("activeImg");
                    $(".buttons div").removeClass("activeDiv");
                    $(".buttons div:eq("+ (nD-1) +")").addClass("activeDiv");  
                    self.timer=self.startTimer();
                });
            }else{
                $(".activeImg").before($(".img_list img:last").clone(true));
                $(".img_list").css({marginLeft:-imgWidth});
                $(".img_list").stop().animate({marginLeft:0},500,function(){
                    $(".img_list").css({marginLeft:-imgWidth*(imgNumber-1)});
                    $(".img_list img:first").remove();

                    
                    $(".img_list img").removeClass("activeImg");
                    $(".img_list img:last").addClass("activeImg");
                    $(".buttons div").removeClass("activeDiv");
                    $(".buttons div:last").addClass("activeDiv"); 
                    self.timer=self.startTimer(); 
                  });
            }

            
        },
        btnTab:function(e){
            var self=this;
            self.clearTimer(self.timer);
            var targetElementId=e.target.id;
            var target=$(".buttons div#"+targetElementId);
            var n=target.index();

            $(".img_list").stop().animate({marginLeft:-imgWidth*n},500,function(){  
                $(".img_list img").removeClass("activeImg");  
                $(".img_list img:eq("+ (n) +")").addClass("activeImg");  
  
                $(".buttons div").removeClass("activeDiv");  
                $(".buttons div:eq("+ (n) +")").addClass("activeDiv");  
                self.timer=self.startTimer();
        });  
        },
        timeLoop:function(){
            var nI=$(".activeImg").index();
            var nD=$(".activeDiv").index();
            if(nI<imgNumber-1){
                $(".img_list").stop().animate({marginLeft:-imgWidth*(nI+1)},500,function(){
                    $(".img_list img").removeClass("activeImg");
                    $(".img_list img:eq("+(nI+1)+")").addClass("activeImg");
                    $(".buttons div").removeClass("activeDiv");
                    $(".buttons div:eq("+ (nD+1) +")").addClass("activeDiv"); 
            });
            }else{
                $(".activeImg").after($(".img_list img:first").clone(true));
                $(".img_list").stop().animate({marginLeft:-imgWidth*(nI+1)},500,function(){
                    $(".img_list").css({marginLeft:0});
                    $(".img_list img:last").remove();

                    
                    $(".img_list img").removeClass("activeImg");
                    $(".img_list img:first").addClass("activeImg");
                    $(".buttons div").removeClass("activeDiv");
                    $(".buttons div:first").addClass("activeDiv");   
             });
            }
        },
        startTimer:function(){
            var self=this;
            return setInterval(self.timeLoop,5000);
        },
        clearTimer:function(timer){
            clearInterval(timer);
        }
    }


    window["LightBox"]=LightBox;
})(jQuery);