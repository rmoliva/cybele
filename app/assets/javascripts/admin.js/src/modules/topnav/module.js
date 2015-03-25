NS('AdminJS.modules.topnav');

AdminJS.modules.topnav.Module = function(sb) {
    'use strict';

    var $el = null;

    var initialize = function(opts, done) {
        $el = $(opts.el);

        React.render(
            React.createElement(AdminJS.components.adminjs.Topnav, null),
            document.querySelector(opts.el),
            done
        );
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
