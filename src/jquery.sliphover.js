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
            fontColor: '#ffffff',
            backgroundColor: 'rgba(0,0,0,.5)', //specify the background color and opacity using rgba
            reverse: false, //reverse the direction
            flip: false, //true to enable the 3d flip animation
            autoScroll: true, //whether auto scroll to show the caption when it is overflow
            scrollSpeed: 40, //if autoScroll is true, this option specify the scroll speed, the smaller the fast
            height: '100%' //specify the height of the overlay
        };

    // The actual plugin constructor
    function SlipHover(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this._version = 'v1.2.0';
        this.init();
    }

    SlipHover.prototype = {
        init: function() {

        },
        getDirection: function($target, event) {
            //reference: http://stackoverflow.com/questions/3627042/jquery-animation-for-a-hover-with-mouse-direction
            //return a number with the maping 0 from top 1 from right 2 from bottom and 3 from the left
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