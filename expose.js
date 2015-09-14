/**
 * React expose
 * A very lightweight React mixin to lazy load images
 * http://dok.github.com/expose
 *
 * Licensed under the MIT license.
 * Copyright 2015 Sean Dokko
 * https://github.com/dok
 */

(function() {
    var root = this;
    var expose = {
        _reveal: function() {
            var called = false;
            return function(cb) {
                if(!called) {
                    called = true;
                    var img = React.findDOMNode(this.refs.image);
                    if (img) {
                        var retina = window.devicePixelRatio > 1;
                        var attrib = retina ? "data-src-retina" : "data-src";
                        var source = img.getAttribute(attrib);
                        source = source || img.getAttribute("data-src");
                        if (source) {
                            img.setAttribute("src", source);
                            if(typeof cb === 'function') {
                                cb.call(this);
                            }
                        }
                    }
                }
            };
        },
        expose: function(th, cb) {
            th = th || 0;
            var self = this;
            var img = React.findDOMNode(this.refs.image);
            if (img) {
                var rev = self._reveal();
                window.addEventListener('scroll', function() {
                    var wt = document.body.scrollTop,
                        wb = wt + window.innerHeight,
                        et = img.offsetTop;
                        eb = et + img.clientHeight;

                    var shouldLoad =  eb >= wt - th && et <= wb + th;
                    if(shouldLoad) {
                        rev.call(self, cb);
                    }
                });
            }
        }
    };

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = expose;
        }
        exports.expose = expose;
    } else {
        root.expose = expose;
    }

    if (typeof define === 'function' && define.amd) {
        define('expose', [], function() {
            return expose;
        });
    }
})();