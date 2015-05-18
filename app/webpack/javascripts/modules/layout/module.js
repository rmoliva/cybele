React = require('react')
ReactComponent = require('../../components/layout')


module.exports = function(sb) {
    'use strict';

    var $el = null;

    var initialize = function(opts, done) {
        $el = $(opts.el);

        sb.promises.reactRender(opts.el, ReactComponent, null).then(function() {
          return done();
        });
    };

    var destroy = function() {
        // Quitar la plantilla
        $el.empty();
    };

    return {
        init: initialize,
        destroy: destroy
    };
};
