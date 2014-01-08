/*
* jquery sliphover 1.0.1
* A hover effect with direction aware jQuery plugin inspired by
* http://tympanus.net/TipsTricks/DirectionAwareHoverEffect/index2.html
* and the 3d flip animation inspired by http://codepen.io/taufnrsyd/pen/ufcdG
*
* Author:Wayou
*
* Licensed under the MIT license.
*
* Bug reporting, suggestion, feature requirments, you can:
* mail to liuwayong@gmail.com
* or visit this project on github https://github.com/Wayou/SlipHover
*/

;(function($,window,document,undefined){

	'use strict';

    var SlipHover=function(element,options){

    	this.$element=element,
    	this.options=$.extend({},this.defaults,options)
	};

	SlipHover.prototype={
		defaults:{//no underscore means this is a public property that users can rewrite it as their own willing
			target:'img',//specify witch html tag the animation will apply on
			title:'title',//specify what information will be display when hover, the title or the alt of the image
			duration:'fast', //specify how long the animation will lasts in milliseconds
			fontColor:'#ffffff',
			backgroundColor:'rgba(0,0,0,.5)',//specify the background color and opacity using rgba
			reverse:false,
			flip:false,//enable the 3d flip animation. for IE only works on IE10+
			autoScroll:true,//if true, the overflowed long text of the overlay will auto scrolling up and down when hover
			scrollSpeed:40,//if autoScroll is true, this option specify the scroll speed, the smaller the fast
			height:'100%'//specify the height of the overlay
		},
		_overlayStyles:{
			normalStyle:{'left':'0','bottom':'0'},
			topStyle:{'left':'0','bottom':'100%'},
			rightStyle:{'left':'100%','bottom':'0'},
			bottomStyle:{'left':'0','bottom':'-100%'},
			leftStyle:{'left':'-100%','bottom':'0'},
			flipStyles:{
				_overlayFlipStyles:{
					topFromStyle:{'transform':'rotateX(-90deg)','-webkit-transform':'rotateX(-90deg)','transform-origin':'top','-webkit-transform-origin':'top'},
					topToStyle:{'transform':'rotateX(0deg)','-webkit-transform':'rotateX(0deg)','transform-origin':'top','-webkit-transform-origin':'top'},
					rightFromStyle:{'transform':'rotateY(-90deg)','-webkit-transform':'rotateY(-90deg)','transform-origin':'right','-webkit-transform-origin':'right'},
					rightToStyle:{'transform':'rotateY(0deg)','-webkit-transform':'rotateY(0deg)','transform-origin':'right','-webkit-transform-origin':'right'},
					bottomFromStyle:{'transform':'rotateX(90deg)','-webkit-transform':'rotateX(90deg)','transform-origin':'bottom','-webkit-transform-origin':'bottom'},
					bottomToStyle:{'transform':'rotateX(0deg)','-webkit-transform':'rotateX(0deg)','transform-origin':'bottom','-webkit-transform-origin':'bottom'},
					leftFromStyle:{'transform':'rotateY(90deg)','-webkit-transform':'rotateY(90deg)','transform-origin':'left','-webkit-transform-origin':'left'},
					leftToStyle:{'transform':'rotateY(0deg)','-webkit-transform':'rotateY(0deg)','transform-origin':'left','-webkit-transform-origin':'left'}
				},
				_containerFlipStyles:{
					topStyle:{'perspective':'500px','perspective-origin':'50% 0%','-webkit-perspective':'500px','-webkit-perspective-origin':'50% 0%'},
					rightStyle:{'perspective':'500px','perspective-origin':'100% 50%','-webkit-perspective':'500px','-webkit-perspective-origin':'100% 50%'},
					bottomStyle:{'perspective':'500px','perspective-origin':'50% 100%','-webkit-perspective':'500px','-webkit-perspective-origin':'50% 100%'},
					leftStyle:{'perspective':'500px','perspective-origin':'0% 50%','-webkit-perspective':'500px','-webkit-perspective-origin':'0% 50%'}
				}
			}
		},
		_ini:function(element,options){//the underscore indicates this is a private method

			var that=this,
				$element=element||this.$element,
				options=options||this.options,
				$targets=$element.find(options.target).size()>0?$element.find(options.target):$element;

			$targets.each(function(){

				var $container=that._createContainer($(this)),
					$overlay=that._createOverlay($container,options,$(this)),
					$innerContainer=$overlay.children(),
					contentHeight=$innerContainer.height(),
					overlayHeight=$overlay.height();

				that._listenEvent($container,$overlay,options);

				//if the text is overflow and the autoScroll options is set to true then auto scroll
				if (that.options.autoScroll&&contentHeight-overlayHeight>0) {

					$overlay.css('overflow','hidden');

					var scrollTop={top:-(contentHeight-overlayHeight)},
					scrollBottom={top:0},
					speed=(contentHeight-overlayHeight)*that.options.scrollSpeed;

					$overlay.hover(function(){
							that._alternateScroll($innerContainer,scrollTop,scrollBottom,speed);
						},function(){
							$overlay.children().stop().css('top','0');
						})
				};
			});

			return $element;
		},
		_alternateScroll:function($element,ani1,ani2,speed){
			var that=this;
			$element.animate(ani1,speed,'linear',function(){
					$element.animate(ani2,speed,'linear',function(){
						that._alternateScroll($element,ani1,ani2,speed);
					});
				});
		},
		_createContainer:function($target){
			var targetOffset=$target.offset(),
			targetWidth=$target.innerWidth(),
			targetHeight=$target.innerHeight(),
			borderWidth=($target.outerWidth()-$target.innerWidth())/2,
			$container=$('<div class="sliphoveritem" style="width:'+targetWidth+'px;height:'+targetHeight+'px;text-align:center;overflow:hidden;position:absolute;top:'+(targetOffset.top+borderWidth)+'px;left:'+(targetOffset.left+borderWidth)+'px;">').insertBefore($target);

			//set initial style for slip mode
			if (this.options.flip) {
				$container.css(this._overlayStyles.flipStyles._containerFlipStyles.leftStyle);
			};

			//fix for IE10,IE9,IE8
			var browser=this._detectBrowser();
			if (browser.isIE&&browser.version<=10) {
				$container.css('background-color','rgba(255,255,255,0.1)');
			};
			return $container;
		},
		_createOverlay:function($container,options,$target){
			var initialStyle=this.options.flip?this._overlayStyles.flipStyles._overlayFlipStyles.leftFromStyle:this._overlayStyles.leftStyle,
			$overlay=$('<div class="sliphoveritemTitle" style="background-color:red;width:100%;height:'+this.options.height+';box-sizing:border-box;-moz-box-sizing:border-box;padding:5px;overflow:auto;position:absolute;color:'+this.options.fontColor+';background-color:'+this.options.backgroundColor+';">')
			.html('<div style="position:relative;width:100%;">'+$target.attr(options.title)+'</div>')
			.css(initialStyle),
				$innerContainer=$overlay.children();


			//set initial style for slip mode
			if (this.options.flip) {
				//$overlay.css({'bottom':'0','left':'0','transition':'transfrom '+this.options.duration+'s','-webkit-transition':'-webkit-transition '+this.options.duration+'s'});
				$overlay.css({'bottom':'0','left':'0','transition':'transform 0.5s','-webkit-transition':'-webkit-transform 0.5s'});
			};

			 $container.html($overlay);

			 //if the content's height is less that the overlay, set the content vertical align middle
			if ($innerContainer.height()<$overlay.height()) {
				$innerContainer.css({'width':$innerContainer.width(),'height':$overlay.height(),'display':'table-cell','vertical-align':'middle','text-align':'center'});
			};
			
			 return $overlay;
		},
		_getDirection:function($target,event){

			//reference: http://stackoverflow.com/questions/3627042/jquery-animation-for-a-hover-with-mouse-direction
				var w = $target.width(),
					h = $target.height(),

					x = ( event.pageX - $target.offset().left - ( w/2 )) * ( w > h ? ( h/w ) : 1 ),
					y = ( event.pageY - $target.offset().top  - ( h/2 )) * ( h > w ? ( w/h ) : 1 ),
				
					direction = Math.round( ( ( ( Math.atan2(y, x) * (180 / Math.PI) ) + 180 ) / 90 ) + 3 ) % 4;
					return direction;

		},
		_listenEvent:function($target,$overlay,options){
			
			var that=this;

			$target.unbind('mouseenter.sliphover mouseleave.sliphover').bind('mouseenter.sliphover mouseleave.sliphover',function(e){
				var eventType=e.type,
				    direction=that._getDirection($target,e);
				that._applyAnimation(eventType,direction,$target,$overlay,options,that._overlayStyles);
			});
		},
		_applyAnimation:function(eventType,direction,$target,$overlay,options,styles){

			if (options.reverse) {direction=(direction+2)%4};//this trick convert 0 to 2,1 to 3 ，vice versa to reverse the animation

			switch(direction) {
			 case 0:
			  /** animations from the TOP **/
				if (eventType=='mouseenter') {

					if (options.flip) {
						if ($.data($overlay,'dir')!=='top') {
							$overlay.css('visibility','hidden');
						    $overlay.css({'transition':'transform 50ms','-webkit-transition':'-webkit-transform 50ms'});
						    $target.css(styles.flipStyles._containerFlipStyles.topStyle);
						    $overlay.css(styles.flipStyles._overlayFlipStyles.topFromStyle);

							$overlay.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',function(){
						   		$overlay.css({'transition':'transform 0.2s','-webkit-transition':'-webkit-transform 0.2s'});
								$overlay.css('visibility','visible');
							   	$overlay.css(styles.flipStyles._overlayFlipStyles.topToStyle);
							   	$overlay.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
							});
						}else{
							$target.css(styles.flipStyles._containerFlipStyles.topStyle);
					    	$overlay.css(styles.flipStyles._overlayFlipStyles.topFromStyle);
						   	$overlay.css(styles.flipStyles._overlayFlipStyles.topToStyle);
						};
					   
					}else{
						$overlay.css(styles.topStyle);
						$overlay.stop().animate(styles.normalStyle,options.duration);
					};
					
				}else{
					if (options.flip) {
						$.data($overlay,'dir','top');
					    $target.css(styles.flipStyles._containerFlipStyles.topStyle);
					    $overlay.css(styles.flipStyles._overlayFlipStyles.topFromStyle);
					}else{
						$overlay.stop().animate(styles.topStyle,options.duration);
					};
				}

			 break;
			 case 1:
			  /** animations from the RIGHT **/
			  if (eventType=='mouseenter') {
			  		if (options.flip) {
			  			if ($.data($overlay,'dir')!=='right') {
								$overlay.css('visibility','hidden');
							    $overlay.css({'transition':'transform 50ms','-webkit-transition':'-webkit-transform 50ms'});
							    $target.css(styles.flipStyles._containerFlipStyles.rightStyle);
							    $overlay.css(styles.flipStyles._overlayFlipStyles.rightFromStyle);

								$overlay.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',function(){
							   		$overlay.css({'transition':'transform 0.2s','-webkit-transition':'-webkit-transform 0.2s'});
									$overlay.css('visibility','visible');
								   	$overlay.css(styles.flipStyles._overlayFlipStyles.rightToStyle);
								   	$overlay.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
								});
							}else{
								$target.css(styles.flipStyles._containerFlipStyles.rightStyle);
						    	$overlay.css(styles.flipStyles._overlayFlipStyles.rightFromStyle);
							   	$overlay.css(styles.flipStyles._overlayFlipStyles.rightToStyle);
							};
							
					}else{
						$overlay.css(styles.rightStyle);
						$overlay.stop().animate(styles.normalStyle,options.duration);
					};
					
				}else{
					if (options.flip) {
						$.data($overlay,'dir','right');
					    $target.css(styles.flipStyles._containerFlipStyles.rightStyle);
					    $overlay.css(styles.flipStyles._overlayFlipStyles.rightFromStyle);
					}else{
						$overlay.stop().animate(styles.rightStyle,options.duration);
					};
				}

			 break;
			 case 2:
			  /** animations from the BOTTOM **/
			  if (eventType=='mouseenter') {
			  		if (options.flip) {
			  			if ($.data($overlay,'dir')!=='bottom') {
								$overlay.css('visibility','hidden');
							    $overlay.css({'transition':'transform 50ms','-webkit-transition':'-webkit-transform 50ms'});
							    $target.css(styles.flipStyles._containerFlipStyles.bottomStyle);
							    $overlay.css(styles.flipStyles._overlayFlipStyles.bottomFromStyle);

								$overlay.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',function(){
							   		$overlay.css({'transition':'transform 0.2s','-webkit-transition':'-webkit-transform 0.2s'});
									$overlay.css('visibility','visible');
								   	$overlay.css(styles.flipStyles._overlayFlipStyles.bottomToStyle);
								   	$overlay.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
								});
							}else{
							   	$target.css(styles.flipStyles._containerFlipStyles.bottomStyle);
							    $overlay.css(styles.flipStyles._overlayFlipStyles.bottomFromStyle);
							    $overlay.css(styles.flipStyles._overlayFlipStyles.bottomToStyle);
							};
							
					}else{
						$overlay.css(styles.bottomStyle);
						$overlay.stop().animate(styles.normalStyle,options.duration);
					};
					
				}else{
					if (options.flip) {
						$.data($overlay,'dir','bottom');
					    $target.css(styles.flipStyles._containerFlipStyles.bottomStyle);
					    $overlay.css(styles.flipStyles._overlayFlipStyles.bottomFromStyle);
					}else{
						$overlay.stop().animate(styles.bottomStyle,options.duration);
					};
				}

			 break;
			 case 3:
			  /** animations from the LEFT **/
			  if (eventType=='mouseenter') {
			  		if (options.flip) {
			  			if ($.data($overlay,'dir')!=='left') {
								$overlay.css('visibility','hidden');
							    $overlay.css({'transition':'transform 50ms','-webkit-transition':'-webkit-transform 50ms'});
							    $target.css(styles.flipStyles._containerFlipStyles.leftStyle);
							    $overlay.css(styles.flipStyles._overlayFlipStyles.leftFromStyle);

								$overlay.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',function(){
							   		$overlay.css({'transition':'transform 0.2s','-webkit-transition':'-webkit-transform 0.2s'});
									$overlay.css('visibility','visible');
								   	$overlay.css(styles.flipStyles._overlayFlipStyles.leftToStyle);
								   	$overlay.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd');
								});
							}else{
							    $target.css(styles.flipStyles._containerFlipStyles.leftStyle);
							    $overlay.css(styles.flipStyles._overlayFlipStyles.leftFromStyle);
							    $overlay.css(styles.flipStyles._overlayFlipStyles.leftToStyle);
							};
					}else{
						$overlay.css(styles.leftStyle);
						$overlay.stop().animate(styles.normalStyle,options.duration);
					};
					
				}else{
					if (options.flip) {
						$.data($overlay,'dir','left');
					    $target.css(styles.flipStyles._containerFlipStyles.leftStyle);
					    $overlay.css(styles.flipStyles._overlayFlipStyles.leftFromStyle);
					}else{
						$overlay.stop().animate(styles.leftStyle,options.duration);
					};
				}

			 break;
			 default:
			 	throw new Error('failed to get the direction.');
			}
		},
		_detectBrowser:function(){
			//http://stackoverflow.com/questions/19562207/jquery-detect-browser-ie9-and-below-and-throw-up-a-modal-to-upgrade
			 var version = 999,
			 isIE=false;
            if (navigator.appVersion.indexOf("MSIE") != -1){
            	isIE=true;
                version = parseFloat(navigator.appVersion.split("MSIE")[1]);
            }
            return {
            	isIE:isIE,
            	version:version
            };
		}
	};

	SlipHover.constructor=SlipHover;//fix the prototype link

	$.fn.sliphover=function(options){

		var entry=$.data(this,'sliphover');

		if (!entry) {
			entry=new SlipHover(this,options);
			entry._ini();
			$.data(this,'sliphover',entry);
		}else{
			entry._ini(this,options);
		}

		//handle the window resize event for it will destroy the layout
		$( window ).unbind('resize.sliphover').bind('resize.sliphover',function() {
			$('.sliphoveritem').remove();
			entry._ini();
		});

		return entry;
	};

}(jQuery,window,document));