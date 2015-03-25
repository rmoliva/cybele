NS('AdminJS.modules.sidebar');

AdminJS.modules.sidebar.Module = function(sb) {
    'use strict';

    var $el = null;

    var items = [{
      href: "#countries",
      title: "Paises"
    }, {
      href: "#users",
      title: "Usuarios"
    }, {
      href: "#networks",
      title: "Redes"
    }, {
      href: "#efqm_trees",
      title: "Árbol EFQM"
    }, {
      href: "#roles",
      title: "Roles"
    }];

    var initialize = function(opts, done) {
        $el = $(opts.el);

        React.render(
            React.createElement(AdminJS.components.statsjs.Sidebar, {
                items: items,
                active: opts.active
            }),
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
