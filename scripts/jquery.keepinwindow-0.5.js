/**
 * Copyright (c) 2011 Paul Mohr, www.sopamo.de
 * Licence: MIT http://www.opensource.org/licenses/mit-license.php
 *
 **/
;
(function($, undefined) {
    var pluginName = 'KeepInWindow',
        author = 'Paul Mohr - eFactory GmbH und Co. KG',
        defaults = {
            direction : 'vertical'
        },
        methods = {
            init : function(options) {
                return this.each(function() {
                    var $this = $(this),
                        p,
                        top,
                        diff,
                        windowTop,
                        diffRemove,
                        newMarginTop,
                        documentHeight,
                        marginTop;
                    if (typeof options == 'undefined')
                        options = {};
                    p = $this.offset();
                    if (typeof options.top == 'undefined')
                        options.top = p.top;
                    if(isNaN(options.top)) options.top = 0;
                    if (typeof options.marginTop == 'undefined')
                        options.marginTop = parseInt($this.css('marginTop'));
                    if(isNaN(options.marginTop)) options.marginTop = 0;
                    $this.data(pluginName, options);
                    $this.data('isHover',0);
                    $this.hover(function () {
                        $this.data('isHover',1);
                    }, function () {
                        $this.data('isHover',0);
                    });
                    $(window).scroll(function () {
                        windowTop = $(window).scrollTop();
                        documentHeight = $(document).height();
                        p = $this.offset();
                        top = p.top;
                        diff = windowTop - top;
                        marginTop = parseInt($this.css('marginTop'));
                        if(isNaN(marginTop)) marginTop = 0;
                        if (diff > 0) {
                            newMarginTop = marginTop + diff + 10;
                        } else if (diff < 0) {
                            diffRemove = diff * -1;
                            newMarginTop = marginTop - diffRemove + 10;
                        }
                        if (documentHeight > top + newMarginTop && (!$this.data('isHover') || $this.height() < $(window).height())) {
                            if (newMarginTop > options.marginTop)
                            {
                                $this.stop().animate({
                                    marginTop: newMarginTop
                                },600);
                            }
                        }
                        if(newMarginTop <= options.marginTop)
                            $this.stop().animate({
                                    marginTop: options.marginTop
                                },600);
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