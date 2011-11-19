/**
 * Copyright (c) 2011 Paul Mohr, www.sopamo.de
 * Licence: MIT http://www.opensource.org/licenses/mit-license.php
 *
 **/
;
(function($, undefined) {
    var pluginName = 'KeepInWindow',
            author = 'Paul Mohr',
            defaults = {
                direction : 'vertical', // Only vertical is supported
                maxHeight : false,
                marginTop : false,
                top : false
            },
            methods = {
                init : function(options) {
                    var settings = $.extend({},defaults,options);
                    return this.each(function() {
                        // Declaring variables
                        var $this = $(this), position, top, diff, windowTop, newMarginTop, marginTop;
                        // Setting some basic data
                        position = $this.offset();
                        if (settings.top === false)
                            settings.top = position.top;
                        if (isNaN(settings.top)) settings.top = 0;
                        if (settings.marginTop === false)
                            settings.marginTop = parseInt($this.css('marginTop'));
                        if (isNaN(settings.marginTop)) settings.marginTop = 0;
                        settings.maxHeight = $(document).height();
                        // Setting options to the object data
                        console.log(settings);
                        $this.data(pluginName, settings);
                        // Store in object data whether the cursor is over the object or not
                        $this.data('isHover', 0);
                        $this.hover(function () {
                            $this.data('isHover', 1);
                        }, function () {
                            $this.data('isHover', 0);
                        });
                        // We want to do some cool stuff when the window scrolls
                        $(window).scroll(function () {
                            // Getting the difference between window top and object top
                            windowTop = $(window).scrollTop();
                            position = $this.offset();
                            top = position.top;
                            diff = windowTop - top;
                            // Getting the old top margin
                            marginTop = parseInt($this.css('marginTop'));
                            if (isNaN(marginTop)) marginTop = 0;
                            // Setting the new top margin
                            if (diff > 0) {
                                newMarginTop = marginTop + diff + 10;
                            } else if (diff < 0) {
                                newMarginTop = marginTop - (diff * -1) + 10;
                            }
                            // If the object won't make the viewport larger and the cursor is not over the element: Animate it down
                            if (settings.maxHeight > newMarginTop + $this.height() && (!$this.data('isHover') || $this.height() < $(window).height())) {
                                if (newMarginTop > settings.marginTop) {
                                    $this.stop().animate({
                                        marginTop: newMarginTop
                                    }, 600);
                                }
                            }
                            // We reached our starting position.
                            if (newMarginTop <= settings.marginTop) {
                                $this.stop().animate({
                                    marginTop: settings.marginTop
                                }, 400);
                            }
                        });
                        return true;
                    });
                }
            };
    $.fn.keepinwindow = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.keepInWindow');
        }
    };
})(jQuery);