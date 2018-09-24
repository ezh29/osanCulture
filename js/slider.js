
(function($){

   function Slider(sel, options){
     
      this.options = options;
      this.initDOM(sel);
      this.bindingEvent();

      if(options.autoStart){
            this.$start.click();
      }else{
            return false;
      }
   }

   Slider.prototype.i=0;
   Slider.prototype.isAnimated=false;
   Slider.prototype.timer=null;
   Slider.prototype.len=0;	


   Slider.prototype.initDOM = function(el){
      this.$panel_li = $(el).find(this.options.panel).children("li");
      this.$navi_li = $(el).find(this.options.navi).children("li");
      this.$prev = $(el).find(this.options.prev);
      this.$next = $(el).find(this.options.next);
      this.$start = $(el).find(this.options.start);
      this.$stop = $(el).find(this.options.stop);
      this.len = this.$panel_li.length;
   }



   Slider.prototype.bindingEvent = function(){
      var this2 = this;

      this.$navi_li.on("click",function(e){
         e.preventDefault();      
         
         var curNum = $(this2.options.panel+">li."+this2.options.activeName).index();
         Slider.prototype.i = $(this).index();

         this2.doStop();
         
         if(curNum>Slider.prototype.i){
            this2.doPrev(Slider.prototype.i);  
         }else{
            this2.doNext(Slider.prototype.i);   
         }
      });


   
      this.$next.on("click",function(e){
         e.preventDefault();
      
         Slider.prototype.i = $(this2.options.panel+">li."+this2.options.activeName).index();

         if(Slider.prototype.i==this2.len-1){
            Slider.prototype.i=0;
         }else{
            Slider.prototype.i++;
         }

         this2.doStop();

         this2.doNext(Slider.prototype.i);      
      });


   
      this.$prev.on("click",function(e){
         e.preventDefault();
      
         Slider.prototype.i = $(this2.options.panel+">li."+this2.options.activeName).index();    

         if(Slider.prototype.i==0){
            Slider.prototype.i=this2.len-1;
         }else{
            Slider.prototype.i--;
         }

         this2.doStop();

         this2.doPrev(Slider.prototype.i);
      });


      this.$start.on("click",function(e){
         e.preventDefault();    

         this2.$start.hide();
         this2.$stop.show();

         Slider.prototype.timer = setInterval(function(){
            if(Slider.prototype.i==this2.len-1){
               Slider.prototype.i=0;
            }else{
               Slider.prototype.i++;
            }
            this2.doNext(Slider.prototype.i);      
         },this2.options.rolling_dur); 
      });


      this.$stop.on("click",function(e){
         e.preventDefault();   

         this2.doStop();
      });  
   }


      
   Slider.prototype.doPrev = function(i){
         
      if(!Slider.prototype.isAnimated){
         Slider.prototype.isAnimated=true;
         this.prevSlide(i);
         this.activateBtn(i);
      }

   }



   Slider.prototype.doNext = function(i){ 
      if(!Slider.prototype.isAnimated){
         Slider.prototype.isAnimated=true;
         this.nextSlide(i);
         this.activateBtn(i);
      }
   }



   Slider.prototype.prevSlide = function(i){
      var this2= this;
      this2.$panel_li.not("."+this2.options.activeName).css("left","-100%");
      $(this2.options.panel+">li."+this2.options.activeName).stop().animate({"left":"100%"},this2.options.dur,function(){      
         $(this).css("left","-100%").removeClass(this2.options.activeName);
      });
      this2.$panel_li.eq(i).stop().animate({"left":"0%"},this2.options.dur,function(){
         $(this).addClass(this2.options.activeName);
         Slider.prototype.isAnimated = false;
      });
   }



   Slider.prototype.nextSlide = function(i){
      var this2 = this;
      this2.$panel_li.not("."+this2.options.activeName).css("left","100%");
      $(this2.options.panel+">li."+this2.options.activeName).stop().animate({"left":"-100%"},this2.options.dur,function(){
         $(this).css("left","100%").removeClass(this2.options.activeName);
      });
      this2.$panel_li.eq(i).stop().animate({"left":"0%"},this2.options.dur,function(){
         $(this).addClass(this2.options.activeName);
         Slider.prototype.isAnimated = false;
      });
   }



   Slider.prototype.activateBtn = function(i){
      this.$navi_li.children("a").removeClass(this.options.activeName);
      this.$navi_li.eq(i).children("a").addClass(this.options.activeName);
   }

   Slider.prototype.doStop = function(){
      this.$start.show();
      this.$stop.hide();

      clearInterval(Slider.prototype.timer);
   }

   $.defaults = {
            dur:500,
            rolling_dur : 2000,
            activeName:"on",
            panel : ".panel",
            navi : ".navi",
            prev : ".prev",
            next : ".next",
            start : ".start",
            stop : ".stop",
            autoStart : false
      }

	$.fn.mySlider = function(options){ 		
		
		options = $.extend(null, $.defaults, options); 
		
		this.each(function(index){			
			var slider = new Slider(this, options); 
		})
		return this;
	}


})(jQuery);
