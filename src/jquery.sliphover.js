/**
 *sliphover v1.2.2
 *issues report https://github.com/wayou/SlipHover/issues?state=open
 */

;
(function($, window, document, undefined) {


    // Create the defaults once
    var pluginName = "sliphover",
        defaults = {
            target: 'img', //the element that the overlay will attach to
            caption: 'title', //the caption that will display when hover
            duration: 'fast', //specify how long the animation will lasts in milliseconds
            fontColor: '#fff',
            backgroundColor: 'rgba(0,0,0,.5)', //specify the background color and opacity using rgba
            reverse: false, //reverse the direction
            flip: false, //true to enable the 3d flip animation
            autoScroll: true, //whether auto scroll to show the caption when it is overflow
            scrollSpeed: 40, //if autoScroll is true, this option specify the scroll speed, the smaller the fast
            height: '100%' //specify the height of the overlay
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

            //bind mouseenter event to the target and create an overlay upon it
            $(this.element).off('mouseenter.sliphover', target).on('mouseenter.sliphover', target, function(event) {
                var $element = $(event.target),
                    $overlayContainer = that.createContainer($element),
                    direction = that.getDirection($element, event);
                //create overlay and slide in
                that.createOverlay(that, $overlayContainer, direction, $element);
            });

             //since the origin target is under the overlay, the mouseleave event can only be attached to the overlay now
            $(this.element).off('mouseleave.sliphover', '.sliphover-container').on('mouseleave.sliphover', '.sliphover-container', function(event) {
                var direction = that.getDirection($(this), event);
                window.console.log('leave triggered');
                //slide out based on the direction
                that.removeOverlay(that, $(this), direction);
            });
        },
        createContainer: function($element) {
            //get the properties of the target
            var top = $element.offset().top,
                left = $element.offset().left,
                //border = parseFloat($element.css("border-left-width")),
                width = $element.outerWidth(),
                height = $element.outerHeight();
            //zIndex = $element.css("z-index");
            var $overlayContainer = $('<div>', {
                class: 'sliphover-container'
            }).css({
                width: width,
                height: height,
                top: top,
                left: left,
            }).insertBefore($element);

            return $overlayContainer;
        },
        createOverlay: function(instance, $overlayContainer, direction, $element) {
            var initClass, $overlay, content;

            switch (direction) {
                case 0: //from top
                    initClass = 'sliphover-top';
                    break;
                case 1: //from right
                    initClass = 'sliphover-right';
                    break;
                case 2: //from bottom
                    initClass = 'sliphover-bottom';
                    break;
                case 3: //from left
                    initClass = 'sliphover-left';
                    break;
                default:
                    window.console.error('error when get direction of the mouse');
            };

            content = $element.attr(instance.settings.caption);
            $overlay = $('<div>', {
                class: 'sliphover-overlay ' + initClass
            })
                .css({
                    backgroundColor: instance.settings.backgroundColor
                })
                .html(content);

            $overlayContainer.html($overlay);

            //slide in
            $overlay.stop().animate({
                top: 0,
                left: 0
            }, instance.settings.duration);
        },
        removeOverlay: function(instance, $overlayContainer, direction) {
            var finalState,
                $overlay = $overlayContainer.find('.sliphover-overlay');

            switch (direction) {
                case 0: //to top
                    finalState = {
                        top: '-100%',
                        left: 0
                    };
                    break;
                case 1: //to right
                    finalState = {
                        top: 0,
                        left: '100%'
                    };
                    break;
                case 2: //to bottom
                    finalState = {
                        top: '100%',
                        left: 0
                    };
                    break;
                case 3: //to left
                    finalState = {
                        top: 0,
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