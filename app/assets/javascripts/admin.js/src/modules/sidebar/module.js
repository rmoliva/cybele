NS('AdminJS.modules.sidebar');

AdminJS.modules.sidebar.Module = function(sb) {
    'use strict';

    var $el = null;
    var model = null;
    var controller = null;

    var _getMenuTree = function() {
      return [{
        text: t("dashboard"),
        alt: t("dashboard"),
        key: 'dashboard_menu',
        iconClass: "block fa fa-home fa-lg",
        palette: "bg-palette1",
        link: 'dashboard'
      }, {
        text: t("users.title"),
        alt: t("users.title"),
        key: 'users_menu',
        iconClass: "block fa fa-users fa-lg",
        palette: "bg-palette2",
        menu: [{
          text: t("users.title"),
          alt: t("users.title"),
          key: 'users_submenu',
          link: 'users'
        }, {
          text: t("roles"),
          alt: t("roles"),
          key: 'roles_submenu',
          link: 'roles'
        }]
      }, {
        text: t("entities"),
        alt: t("entities"),
        iconClass: "block fa fa-sitemap fa-lg",
        palette: "bg-palette3",
        key: 'entities',
        menu: [{
          text: t("congregation"),
          alt: t("congregation"),
          key: 'congregation_submenu',
        }]
      }];
    };
    
    var initialize = function(opts, done) {
        $el = $(opts.el);
        
        model = new AdminJS.modules.sidebar.Model(sb);
        controller = new AdminJS.modules.sidebar.Controller(sb, model);
        
        // Renderizamos la plantilla
        sb.promises.reactRender(
          opts.el,
          AdminJS.components.adminjs.Sidebar, {
            controller: controller,
            model: model
          }
        ).then(function() {
          // TODO: El menu lateral se carga dinamicamente en base a la entidad
          model.set('menu_tree', _getMenuTree());
          model.set('sidebar_active', opts.sidebar_active || 'dashboard_menu');
        }).then(function() {
          done();
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
