/**
 * sliphover v2.0.1
 * require jquery 1.7+
 * wayou June 24, 2014,
 * MIT License
 * for more info pls visit :https://github.com/wayou/SlipHover
 */

;(function($, window, document, undefined) {

    // Create the defaults once
    var pluginName = "sliphover",
        defaults = {
            target: 'img', //the element that the overlay will attach to
            caption: 'title', //the caption that will display when hover
            duration: 'fast', //specify how long the animation will lasts in milliseconds
            fontColor: '#fff',
            textAlign: 'center', //display the caption left, center or right
            verticalMiddle: true, //display the caption vertical middle or not
            backgroundColor: 'rgba(0,0,0,.7)', //specify the background color and opacity using rgba
            reverse: false, //reverse the direction
            height: '100%', //specify the height of the overlay
            withLink: true //if image is wraped with a link the overlay will be clickable, set false to disable click
        };

    function SlipHover(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.version = 'v1.2.0';
        this.init();
    }

    SlipHover.prototype = {
        init: function() {
            var that = this,
                target = this.settings.target;

            //create the overlay container each time the mouse enters
            $(this.element).off('mouseenter.sliphover', target).on('mouseenter.sliphover', target, function(event) {
                var $element = $(event.target),
                    $overlayContainer = that.createContainer($element);

                $overlayContainer.off('mouseenter.sliphover mouseleave.sliphover').on('mouseenter.sliphover mouseleave.sliphover', function(event) {
                    //if (!$overlayContainer) return;
                    var direction = that.getDirection($(this), event);

                    //check if reverse option is on
                    direction = that.settings.reverse ? direction = (direction + 2) % 4 : direction;

                    if (event.type === 'mouseenter') {
                        //check if the previous overlay still exists before we create it
                        var $overlay = $overlayContainer.find('.sliphover-overlay');
                        if (!$overlay.length) {
                            $overlay = that.createOverlay(that, direction, $element);
                            //put the overlay into the container
                            $(this).html($overlay);
                        }
                        that.slideIn(that, $overlay);
                    } else {
                        //slide out based on the direction
                        that.removeOverlay(that, $(this), direction);
                    }
                });
            });
        },
        createContainer: function($element) {
            //get the properties of the target
            var top = $element.offset().top,
                left = $element.offset().left,
                //border = parseFloat($element.css("border-left-width")),
                width = $element.outerWidth(),
                height = $element.outerHeight();
            zIndex = $element.css("z-index");
            var $overlayContainer = $('<div>', {
                class: 'sliphover-container'
            }).css({
                width: width,
                height: height,
                position: 'absolute',
                overflow: 'hidden',
                top: top,
                left: left,
                borderRadius:$element.css('border-radius'),//in case the target has a round border, this will make the overlay more nicer
                zIndex: zIndex == +zIndex ? (zIndex + 1) : 999 // if the z-index of the target is not number then use 999
            });

            $('body').append($overlayContainer);

            return $overlayContainer;
        },
        createOverlay: function(instance, direction, $element) {

            var bottom, left, $overlay, content, $targetAParent;

            switch (direction) {
                case 0:
                    //from top
                    left = 0;
                    bottom = '100%';
                    break;
                case 1:
                    //from right
                    left = '100%';
                    bottom = 0;
                    break;
                case 2:
                    //from bottom
                    left = 0;
                    bottom = '-100%';
                    break;
                case 3:
                    //from left
                    left = '-100%';
                    bottom = 0;
                    break;
                default:
                    window.console.error('error when get direction of the mouse');
            };

            //if we want to display content vertical middle, we need to wrap the content into a div and set the style with display table-cell
            if (instance.settings.verticalMiddle) {
                content = $('<div>').css({
                    display: 'table-cell',
                    verticalAlign: 'middle'
                }).html($element.attr(instance.settings.caption));
            } else {
                content = $element.attr(instance.settings.caption);
            }
            $targetAParent = $element.parent('a');
            if ($targetAParent.length && instance.settings.withLink) {
                var url = $targetAParent.attr('href');
                $overlay = $('<a>', {
                    class: 'sliphover-overlay',
                    href: url || '#'
                }).css({
                    textDecoration: 'none'
                });
            } else {
                $overlay = $('<div>', {
                    class: 'sliphover-overlay'
                });
            }

            $overlay.css({
                width: '100%',
                height: instance.settings.height,
                position: 'absolute',
                left: left,
                bottom: bottom,
                display: instance.settings.verticalMiddle ? 'table' : 'inline',
                textAlign: instance.settings.textAlign,
                color: instance.settings.fontColor,
                backgroundColor: instance.settings.backgroundColor
            })
                .html(content);
            return $overlay;
        },
        slideIn: function(instance, $overlay) {
            $overlay.stop().animate({
                left: 0,
                bottom: 0
            }, instance.settings.duration);
        },
        removeOverlay: function(instance, $overlayContainer, direction) {
            var finalState,
                $overlay = $overlayContainer.find('.sliphover-overlay');

            switch (direction) {
                case 0: //to top
                    finalState = {
                        bottom: '100%',
                        left: 0
                    };
                    break;
                case 1: //to right
                    finalState = {
                        bottom: 0,
                        left: '100%'
                    };
                    break;
                case 2: //to bottom
                    finalState = {
                        bottom: '-100%',
                        left: 0
                    };
                    break;
                case 3: //to left
                    finalState = {
                        bottom: 0,
                        left: '-100%'
                    };
                    break;
                default:
                    window.console.error('error when get direction of the mouse');
            };

            //slide out
            $overlay.stop().animate(finalState, instance.settings.duration, function() {
                $overlayContainer.remove();
            });
        },
        getDirection: function($target, event) {
            //reference: http://stackoverflow.com/questions/3627042/jquery-animation-for-a-hover-with-mouse-direction
            var w = $target.width(),
                h = $target.height(),
                x = (event.pageX - $target.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
                y = (event.pageY - $target.offset().top - (h / 2)) * (h > w ? (w / h) : 1),
                direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
            return direction;
        }
    };

    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new SlipHover(this, options));
            }
        });

        // chain jQuery functions
        return this;
    };

})(jQuery, window, document);