/**
 *sliphover v1.2.0
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
            //steps to implement this awesome plugin
            //step 1: find all targets specified by the target option
            //step 2: get the mouse event type(enter or leave) and direction
            //step 3: based on the result from step 2,dynamically create an absolute positioned container aside the target
            //step 4: fill the container with content specified by the caption option
            //step 5: apply animation to the overlay to slide it in if mouse enter or slide out when mouse leave
            //step 6: remove all stuff when slide out
            var that = this,
                target = this.target || 'img'; //if the given value if not valid, use img by default
            $(this.element).off('mouseenter.sliphover mouseout.sliphover', target)
                .on('mouseenter.sliphover mouseout.sliphover', target, function(event) {
                    var $element = $(event.target),
                        overlay = that.createOverlay($element),
                        direction = that.getDirection($element, event);
                    that.applyAnimation(direction, $element, event);
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
        },
        createOverlay: function($element) {
            var top = parseFloat($element.offset().top),
                left = parseFloat($element.offset().left),
                border=parseFloat($element.css("border-left-width")),
                width = $element.width(),
                height = $element.height(),
                zIndex=$element.css("z-index");
            $('<div/>', {
                class: 'sliphover-container'
            }).css({
                width: width,
                height: height,
                position: 'absolute',
                top: (top+border)+'px',
                left: (left+border)+'px',
                zIndex:zIndex+1,
                backgroundColor:'rgba(0,0,0,.5)'
            }).insertBefore($element);

        },
        removeOverlay:function($element){

        },
        applyAnimation: function(direction, $element, event) {
            switch (direction) {
                case 0: //from top
                    if (event.type == 'mouseenter') {
                        console.log('enter from top')
                    } else {
                        console.log('leave from top')
                    }
                    break;
                case 1: //from right
                    if (event.type == 'mouseenter') {
                        console.log('enter from right')
                    } else {
                        console.log('leave from right')
                    }
                    break;
                case 2: //from bottom
                    if (event.type == 'mouseenter') {
                        console.log('enter from bottom')
                    } else {
                        console.log('leave from bottom')
                    }
                    break;
                case 3: //from left
                    if (event.type == 'mouseenter') {
                        console.log('enter from left')
                    } else {
                        console.log('leave from left')
                    }
                    break;
            };
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