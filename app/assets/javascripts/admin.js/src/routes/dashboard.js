NS('AdminJS.routes');

AdminJS.routes.Dashboard = function(core) {
    'use strict';
    
    var routes = {
        dashboard: null 
    }
    
    /**
     * Registra todos los módulos de la aplicación Configurations en scaleApp
     */
    var initialize = function(router) {
      routes.dashboard = router.addRoute('dashboard', onRouteDashboard);
    };

    /**
     * Parar los modulos y desregistrar todos
     */
    var destroy = function(router) {
      _.each(routes, function(item) {
        router.removeRoute(item);
      });
    };

    var onRouteDashboard = function(options) {
      core.modules.startLayout(
          _.merge({sidebar_active: 'dashboard_menu'},options)
      ).done();
    };
    
    return {
        initialize: initialize,
        destroy: destroy
    };
};
