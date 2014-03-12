/*
 * jquery sliphover 1.1.4
 * apply 2d/3d hover animation to images
 *
 * inspired by http://tympanus.net/TipsTricks/DirectionAwareHoverEffect/index2.html
 * and http://codepen.io/taufnrsyd/pen/ufcdG
 *
 * Author:Wayou
 *
 * Licensed under the MIT license.
 *
 * Bug reporting, suggestion, feature requirments, you can:
 * mail to liuwayong@gmail.com
 * or visit the project on github https://github.com/Wayou/SlipHover to open issues
 */
;(function($, window, document, undefined) {
    'use strict';
    var SlipHover = function(element, options) {
        this.$element = element,
        this.options = $.extend({}, this.defaults, options)
    };
    SlipHover.prototype = {
        defaults: { //no underscore means this is a public property that users can rewrite it as their own willing
            target: 'img', //specify witch html tag the animation will apply on
            title: 'title', //specify what information will be display when hover, the title or the alt of the image
            duration: 'fast', //specify how long the animation will lasts in milliseconds
            fontColor: '#ffffff',
            backgroundColor: 'rgba(0,0,0,.5)', //specify the background color and opacity using rgba
            reverse: false,
            flip: false, //true to enable the 3d flip animation
            autoScroll: true, //if true, the overflowed long text of the overlay will auto scrolling up and down when hover
            scrollSpeed: 40, //if autoScroll is true, this option specify the scroll speed, the smaller the fast
            height: '100%' //specify the height of the overlay
        },
        _overlayStyles: {
            normalStyle: {
                'left': '0',
                'bottom': '0'
            },
            topStyle: {
                'left': '0',
                'bottom': '100%'
            },
            rightStyle: {
                'left': '100%',
                'bottom': '0'
            },
            bottomStyle: {
                'left': '0',
                'bottom': '-100%'
            },
            leftStyle: {
                'left': '-100%',
                'bottom': '0'
            }
        },
        _perspectiveOrigins: {
            topPerspectiveOrigin: {
                'perspective-origin': '50% 0%',
                '-webkit-perspective-origin': '50% 0%'
            },
            rightPerspectiveOrigin: {
                'perspective-origin': '100% 50%',
                '-webkit-perspective-origin': '100% 50%'
            },
            bottomPerspectiveOrigin: {
                'perspective-origin': '50% 100%',
                '-webkit-perspective-origin': '50% 100%'
            },
            leftPerspectiveOrigin: {
                'perspective-origin': '0% 50%',
                '-webkit-perspective-origin': '0% 50%'
            }
        },
        _keyframes: '@-webkit-keyframes topenter{ 	from{ 		-webkit-transform-origin:top; 		-webkit-transform:rotateX(-90deg); 	} 	to{ 		-webkit-transform-origin:top; 		-webkit-transform:rotateX(0deg); 	} } @keyframes topenter{ 	from{ 		transform-origin:top; 		transform:rotateX(-90deg); 	} 	to{ 		transform-origin:top; 		transform:rotateX(0deg); 	} } @-webkit-keyframes topleave{ 	from{ 		-webkit-transform-origin:top; 		-webkit-transform:rotateX(0deg); 	} 	to{ 		-webkit-transform-origin:top; 		-webkit-transform:rotateX(-90deg); 	} } @keyframes topleave{ 	from{ 		transform-origin:top; 		transform:rotateX(0deg); 	} 	to{ 		transform-origin:top; 		transform:rotateX(-90deg); 	} }  @-webkit-keyframes rightenter{ 	from{ 		-webkit-transform-origin:right; 		-webkit-transform:rotateY(-90deg); 	} 	to{ 		-webkit-transform-origin:right; 		-webkit-transform:rotateY(0deg); 	} } @keyframes rightenter{ 	from{ 		transform-origin:right; 		transform:rotateY(-90deg); 	} 	to{ 		transform-origin:right; 		transform:rotateY(0deg); 	} } @-webkit-keyframes rightleave{ 	from{ 		-webkit-transform-origin:right; 		-webkit-transform:rotateY(0deg); 	} 	to{ 		-webkit-transform-origin:right; 		-webkit-transform:rotateY(-90deg); 	} } @keyframes rightleave{ 	from{ 		transform-origin:right; 		transform:rotateY(0deg); 	} 	to{ 		transform-origin:right; 		transform:rotateY(-90deg); 	} }  @-webkit-keyframes bottomenter{ 	from{ 		-webkit-transform-origin:bottom; 		-webkit-transform:rotateX(90deg); 	} 	to{ 		-webkit-transform-origin:bottom; 		-webkit-transform:rotateX(0deg); 	} } @keyframes bottomenter{ 	from{ 		transform-origin:bottom; 		transform:rotateX(90deg); 	} 	to{ 		transform-origin:bottom; 		transform:rotateX(0deg); 	} } @-webkit-keyframes bottomleave{ 	from{ 		-webkit-transform-origin:bottom; 		-webkit-transform:rotateX(0deg); 	} 	to{ 		-webkit-transform-origin:bottom; 		-webkit-transform:rotateX(90deg); 	} } @keyframes bottomleave{ 	from{ 		transform-origin:bottom; 		transform:rotateX(0deg); 	} 	to{ 		transform-origin:bottom; 		transform:rotateX(90deg); 	} }  @-webkit-keyframes leftenter{ 	from{ 		-webkit-transform-origin:left; 		-webkit-transform:rotateY(90deg); 	} 	to{ 		-webkit-transform-origin:left; 		-webkit-transform:rotateY(0deg); 	} } @keyframes leftenter{ 	from{ 		transform-origin:left; 		transform:rotateY(90deg); 	} 	to{ 		transform-origin:left; 		transform:rotateY(0deg); 	} } @-webkit-keyframes leftleave{ 	from{ 		-webkit-transform-origin:left; 		-webkit-transform:rotateY(0deg); 	} 	to{ 		-webkit-transform-origin:left; 		-webkit-transform:rotateY(90deg); 	} } @keyframes leftleave{ 	from{ 		transform-origin:left; 		transform:rotateY(0deg); 	} 	to{ 		transform-origin:left; 		transform:rotateY(90deg); 	} }',
        _ini: function(element, options) { //the underscore indicates this is a private method
            var that = this,
                $element = element || this.$element,
                options = options || this.options,
                $targets = $element.find(options.target).size() > 0 ? $element.find(options.target) : $element;
            if (this.options.flip) {
                var $styleTag = $('style').length === 0 ? $('<style>') : $('style').first(); //if in 3d flip mode, create the keyframes for the 3d animation
                $styleTag.append(this._keyframes).appendTo('head');
            };
            $targets.each(function() {
                var $container = that._createContainer($(this)),
                    $overlay = that._createOverlay($container, options, $(this)),
                    $innerContainer = $overlay.children(),
                    contentHeight = $innerContainer.height(),
                    overlayHeight = $overlay.height();
                that._listenEvent($container, $overlay, options);
                //if the text is overflow and the autoScroll options is set to true then auto scroll
                if (that.options.autoScroll && contentHeight - overlayHeight > 0) {
                    $overlay.css('overflow', 'hidden');
                    var scrollTop = {
                        top: -(contentHeight - overlayHeight)
                    },
                        scrollBottom = {
                            top: 0
                        },
                        speed = (contentHeight - overlayHeight) * that.options.scrollSpeed;
                    $overlay.hover(function() {
                        that._alternateScroll($innerContainer, scrollTop, scrollBottom, speed);
                    }, function() {
                        $overlay.children().stop().css('top', '0');
                    })
                };
            });
            return $element;
        },
        _alternateScroll: function($element, ani1, ani2, speed) {
            var that = this;
            $element.animate(ani1, speed, 'linear', function() {
                $element.animate(ani2, speed, 'linear', function() {
                    that._alternateScroll($element, ani1, ani2, speed);
                });
            });
        },
        _createContainer: function($target) {
            //fix for issue#1 https://github.com/Wayou/SlipHover/issues/1
            var notStaticParents = $target.parents().filter(function() {
                return this.style.position !== 'static';
            }).length,
                targetOffset = notStaticParents ? $target.position() : $target.offset(),
                // targetWidth = $target.innerWidth(),
                // targetHeight = $target.innerHeight(),
                 targetWidth = $target.outerWidth(),
                targetHeight = $target.outerHeight(),
                borderWidth = ($target.outerWidth() - $target.innerWidth()) / 2,
                // containerTop = targetOffset.top + borderWidth,
                // containerLeft = targetOffset.left + borderWidth,
                containerTop = targetOffset.top,
                containerLeft = targetOffset.left,
                $container = $('<div class="sliphoveritem" style="border-radius:'+$target.css('borderRadius')+';width:' + targetWidth + 'px;height:' + targetHeight + 'px;text-align:center;overflow:hidden;position:absolute;top:' + containerTop + 'px;left:' + containerLeft + 'px;">').insertBefore($target);
            //if in 3d flip style, set the perspective css property for the container
            if (this.options.flip) {
                $container.css({
                    'perspective': '500px',
                    '-webkit-perspective': '500px',
                    'perspective-origin': '0% 50%',
                    '-webkit-perspective-origin': '0% 50%'
                });
            };
            //fix for IE10,IE9,IE8
            var browser = this._detectBrowser();
            if (browser.isIE && browser.version <= 10) {
                $container.css('background-color', 'rgba(255,255,255,0.1)');
            };
            return $container;
        },
        _createOverlay: function($container, options, $target) {
            var $overlay = $('<div class="sliphoveritemTitle" style="border-radius:'+$target.css('borderRadius')+';width:100%;height:' + this.options.height + ';box-sizing:border-box;-moz-box-sizing:border-box;padding:5px;overflow:auto;position:absolute;color:' + this.options.fontColor + ';background-color:' + this.options.backgroundColor + ';">').html('<div style="position:relative;width:100%;">' + $target.attr(options.title) + '</div>'),
                $innerContainer = $overlay.children();
            //initialize elements' style
            if (this.options.flip) {
                $overlay.css({
                    'left': '0',
                    'bottom': '0',
                    'transform-origin': 'left',
                    'transform': 'rotateY(90deg)',
                    '-webkit-transform-origin': 'left',
                    '-webkit-transform': 'rotateY(90deg)',
                    'backface-visibility': 'hidden',
                    '-webkit-backface-visibility': 'hidden'
                });
            } else {
                $overlay.css(this._overlayStyles.leftStyle);
            };
            $container.html($overlay);
            //if the content's height is less that the overlay, set the content vertical align middle
            if ($innerContainer.height() < $overlay.height()) {
                $innerContainer.css({
                    'width': $innerContainer.width(),
                    'height': $overlay.height(),
                    'display': 'table-cell',
                    'vertical-align': 'middle',
                    'text-align': 'center'
                });
            };
            return $overlay;
        },
        _setAnimationCSS: function(perspective_origin, ani_name, $container, $overlay) {
            var duration = this.options.duration;
            switch (duration) {
                case 'fast':
                    duration = '200ms';
                    break;
                case 'slow':
                    duration = '600ms';
                    break;
                default:
                    duration = duration + 'ms';
                    break;
            };
            $container.css(perspective_origin); //set the perspective-origin for the container
            $overlay.css({
                'animation': ani_name + ' ' + duration + ' forwards',
                '-webkit-animation': ani_name + ' ' + duration + ' forwards'
            }); //set the animation name for the overlay
        },
        _getDirection: function($target, event) {
            //reference: http://stackoverflow.com/questions/3627042/jquery-animation-for-a-hover-with-mouse-direction
            var w = $target.width(),
                h = $target.height(),
                x = (event.pageX - $target.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
                y = (event.pageY - $target.offset().top - (h / 2)) * (h > w ? (w / h) : 1),
                direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
            return direction;
        },
        _listenEvent: function($target, $overlay, options) {
            var that = this;
            $target.unbind('mouseenter.sliphover mouseleave.sliphover').bind('mouseenter.sliphover mouseleave.sliphover', function(e) {
                var eventType = e.type,
                    direction = that._getDirection($target, e);
                that._applyAnimation(eventType, direction, $target, $overlay, options, that._overlayStyles);
            });
        },
        _applyAnimation: function(eventType, direction, $container, $overlay, options, styles) {
            if (options.reverse) {
                direction = (direction + 2) % 4
            }; //this trick convert 0 to 2,1 to 3 ，vice versa to reverse the animation
            switch (direction) {
                case 0:
                    /** animations from the TOP **/
                    if (eventType == 'mouseenter') {
                        if (options.flip) {
                            this._setAnimationCSS(this._perspectiveOrigins.topPerspectiveOrigin, 'topenter', $container, $overlay);
                        } else {
                            $overlay.css(styles.topStyle);
                            $overlay.stop().animate(styles.normalStyle, options.duration);
                        };
                    } else {
                        if (options.flip) {
                            this._setAnimationCSS(this._perspectiveOrigins.topPerspectiveOrigin, 'topleave', $container, $overlay);
                        } else {
                            $overlay.stop().animate(styles.topStyle, options.duration);
                        };
                    }
                    break;
                case 1:
                    /** animations from the RIGHT **/
                    if (eventType == 'mouseenter') {
                        if (options.flip) {
                            this._setAnimationCSS(this._perspectiveOrigins.rightPerspectiveOrigin, 'rightenter', $container, $overlay);
                        } else {
                            $overlay.css(styles.rightStyle);
                            $overlay.stop().animate(styles.normalStyle, options.duration);
                        };
                    } else {
                        if (options.flip) {
                            this._setAnimationCSS(this._perspectiveOrigins.rightPerspectiveOrigin, 'rightleave', $container, $overlay);
                        } else {
                            $overlay.stop().animate(styles.rightStyle, options.duration);
                        };
                    }
                    break;
                case 2:
                    /** animations from the BOTTOM **/
                    if (eventType == 'mouseenter') {
                        if (options.flip) {
                            this._setAnimationCSS(this._perspectiveOrigins.bottomPerspectiveOrigin, 'bottomenter', $container, $overlay);
                        } else {
                            $overlay.css(styles.bottomStyle);
                            $overlay.stop().animate(styles.normalStyle, options.duration);
                        };
                    } else {
                        if (options.flip) {
                            this._setAnimationCSS(this._perspectiveOrigins.bottomPerspectiveOrigin, 'bottomleave', $container, $overlay);
                        } else {
                            $overlay.stop().animate(styles.bottomStyle, options.duration);
                        };
                    }
                    break;
                case 3:
                    /** animations from the LEFT **/
                    if (eventType == 'mouseenter') {
                        if (options.flip) {
                            this._setAnimationCSS(this._perspectiveOrigins.leftPerspectiveOrigin, 'leftenter', $container, $overlay);
                        } else {
                            $overlay.css(styles.leftStyle);
                            $overlay.stop().animate(styles.normalStyle, options.duration);
                        };
                    } else {
                        if (options.flip) {
                            this._setAnimationCSS(this._perspectiveOrigins.leftPerspectiveOrigin, 'leftleave', $container, $overlay);
                        } else {
                            $overlay.stop().animate(styles.leftStyle, options.duration);
                        };
                    }
                    break;
                default:
                    throw new Error('failed to get the direction.');
            }
        },
        _detectBrowser: function() {
            //http://stackoverflow.com/questions/19562207/jquery-detect-browser-ie9-and-below-and-throw-up-a-modal-to-upgrade
            var version = 999,
                isIE = false;
            if (navigator.appVersion.indexOf("MSIE") != -1) {
                isIE = true;
                version = parseFloat(navigator.appVersion.split("MSIE")[1]);
            }
            return {
                isIE: isIE,
                version: version
            };
        }
    };
    SlipHover.constructor = SlipHover; //fix the prototype link
    $.fn.sliphover = function(options) {
        var entry = $.data(this, 'sliphover');
        if (!entry) {
            entry = new SlipHover(this, options);
            entry._ini();
            $.data(this, 'sliphover', entry);
        } else {
            entry._ini(this, options);
        }
        //handle the window resize event for it will destroy the layout
        $(window).unbind('resize.sliphover').bind('resize.sliphover', function() {
            $('.sliphoveritem').remove();
            entry._ini();
        });
        return entry;
    };
}(jQuery, window, document));