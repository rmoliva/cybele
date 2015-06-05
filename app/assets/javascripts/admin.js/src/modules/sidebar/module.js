NS('AdminJS.modules.sidebar');

AdminJS.modules.sidebar.Module = function(sb) {
    'use strict';

    var el = null;
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
        el = opts.el;
        
        model = immstruct({
          menu_tree: _getMenuTree(),
          sidebar_active: opts.sidebar_active
        });
        
        AdminJS.lib.ControllerCreator.create(
            AdminJS.modules.sidebar.Controller(sb, model),
            opts // Es lo mismo que se pasara al handleInit
        ).then(function(ctl) {
          controller = ctl;
          return doRender();
        }).then(function() {
          model.on('swap', doRender);
          done();
        });
    };

    var doRender = function(newStructure, oldStructure, keyPath) {
      return sb.promises.reactRender(
          el,
          AdminJS.modules.sidebar.View, {
            controller: controller,
            model: model
          }
      );
    };

    var destroy = function() {
        // Quitar la plantilla
        $(el).empty();
    };

    return {
        init: initialize,
        destroy: destroy
    };
};
