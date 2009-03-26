/* ------------------------------------------------------------------------
	s3Slider

  Current version:
    Michael Grosser -> http://pragmatig.wordpress.com

  Original:
    Developped By: Boban Karišik -> http://www.serie3.info/
          CSS Help: Mészáros Róbert -> http://www.perspectived.com/

	Copyright: Redistribute, but keep infos at the top.
------------------------------------------------------------------------- */


(function($){


$.fn.s3Slider = function(vars) {
  vars = vars || {};
  var $slider     = $(this);
  var timeOut     = vars.timeOut || 6000;
  var fadeTime    = vars.fadeTime || 1000;
  var spanOpacity = vars.spanOpacity || .7;
  var current     = 0;
  var mouseOver   = false;
  var items       = $(".slide", $slider);

  //Track mouseover
  $slider.mouseover(function() {
    mouseOver = true;
  });
  $slider.mouseout(function() {
    mouseOver = false;
  });

  function visible(item){
    return $(item).css('display')!='none'
  }

  function slide(){
    var item = $(items[current]);
    var span = $('span',item);
    if(visible(item)) {
      fadeOut(item,span);
      current = (current + 1) % items.length;
    } else {
      span.hide();
      fadeIn(item,span);
    }
  }

  function setSlideTimeout(time) {
    setTimeout(trySlide, time);
  }

  //if user blocks, then try again in a bit...
  function trySlide(){
    if(mouseOver){
      setSlideTimeout(fadeTime)
    } else {
      slide();
    }
  }

 function fadeIn(item,span){
    item.fadeIn(fadeTime, function() {
	if($.browser.msie){
	  span.css("opacity",0).show().fadeTo(fadeTime,spanOpacity,function(){
	    setSlideTimeout(timeOut);//=> wait ...
	  });
	}else{
	  span.fadeIn(fadeTime,function(){
            setSlideTimeout(timeOut);//=> wait ...
	  });
	}
    });
  }

  function fadeOut(item,span){
    if($.browser.msie){
       span.fadeTo("slow",0,function(){
         item.fadeOut(fadeTime,function(){
	   slide();//=> fadeIn
	 });
       });
    }else{
       span.fadeOut('slow',function(){
         item.fadeOut(fadeTime,function(){
	   slide();//=> fadeIn
	 });
       });
    }
  }

  setSlideTimeout(visible(items[0]) ? timeOut : 0);//start!
};


})(jQuery);  