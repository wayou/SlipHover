/**
*sliphover v1.2.0
*https://github.com/wayou/SlipHover
*/

;(function($, window, document, undefined) {


    // Create the defaults once
    var pluginName = "sliphover",
        defaults = {
            target: 'img', //the element that the overlay will attach to
            caption: 'title', //the caption that will display when hover
            duration: 'fast', //specify how long the animation will lasts in milliseconds
            fontColor: '#ffffff',
            backgroundColor: 'rgba(0,0,0,.5)', //specify the background color and opacity using rgba
            reverse: false,//reverse the direction
            flip: false, //true to enable the 3d flip animation
            autoScroll: true, //if true, the overflowed long text of the overlay will auto scrolling up and down when hover
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
        yourOtherFunction: function() {
            // some logic
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
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