NS('AdminJS.modules.sidebar');

AdminJS.modules.sidebar.Module = function(sb) {
    'use strict';

    var $el = null;

    var initialize = function(opts, done) {
        $el = $(opts.el);
        
        React.render(
            React.createElement(AdminJS.components.adminjs.Sidebar, {
              menu: [{
                text: t("dashboard"),
                alt: t("dashboard"),
                link: 'dashboard',
                iconClass: "block fa fa-home fa-lg",
                palette: "bg-palette1",
                active: true
              }, {
                text: t("users"),
                alt: t("users"),
                iconClass: "block fa fa-users fa-lg",
                palette: "bg-palette2",
                menu: [{
                  text: t("users"),
                  alt: t("users"),
                  link: 'users',
                }, {
                  text: t("roles"),
                  alt: t("roles"),
                  link: 'roles',
                }]
              }, {
                text: t("entities"),
                alt: t("entities"),
                iconClass: "block fa fa-sitemap fa-lg",
                palette: "bg-palette3",
                menu: [{
                  text: t("congregation"),
                  alt: t("congregation"),
                  link: 'users',
                }]
              }]
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
