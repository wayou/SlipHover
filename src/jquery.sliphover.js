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
            var that = this,
                target = this.target || 'img'; //if the given value if not valid, use img by default
            $(this.element).off('mouseenter.sliphover mouseout.sliphover', target)
                .on('mouseenter.sliphover mouseout.sliphover', target, function(event) {
                    var $element = $(event.target),
                        //$overlayContainer = that.createContainer($element),
                        direction = that.getDirection($element, event);

                    if (event.type == 'mouseenter') {
                        //create overlay and slide in
                        //that.createOverlay(that, $overlayContainer, direction, $element);
                        console.log('overlay created');
                    } else {
                        //slide out and remove the overlay
                        var overlayId = $element.data('sliphover_overlay');
                        console.log($('#' + overlayId));
                        $('#' + overlayId).remove();
                    }
                });
        },
        createContainer: function($element) {
            //get the properties of the target
            var top = parseFloat($element.offset().top),
                left = parseFloat($element.offset().left),
                border = parseFloat($element.css("border-left-width")),
                width = $element.width(),
                height = $element.height(),
                zIndex = $element.css("z-index");
            var $overlayContainer = $('<div/>', {
                class: 'sliphover-container',
                id: new Date().getTime()
            }).css({
                width: width,
                height: height,
                position: 'absolute',
                top: (top + border) + 'px',
                left: (left + border) + 'px',
                zIndex: zIndex + 1,
                backgroundColor: 'rgba(0,0,0,.5)'
            }).insertBefore($element);
            $element.data('sliphover_overlay', $overlayContainer.attr('id'));

            return $overlayContainer;

        },
        createOverlay: function(instance, $overlayContainer, direction, $element) {
            var initClass, $overlay, content;

            switch (direction) {
                case 0: //from top
                    initClass = 'sliphover-top'
                    break;
                case 1: //from right
                    initClass = 'sliphover-right'
                    break;
                case 2: //from bottom
                    initClass = 'sliphover-bottom'
                    break;
                case 3: //from left
                    initClass = 'sliphover-left'
                    break;
                default:
                    console.error('error when get direction of the mouse');
            };

            content = $element.attr(instance.settings.caption);
            $overlay = $('<div>', {
                class: initClass
            }).html(content);

            $overlayContainer.html($overlay);
        },
        removeOverlay: function($element) {

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