NS('AdminJS.routes');

AdminJS.routes.Login = function(core) {
    'use strict';
    
    var routes = {
        login: null 
    }
    

    var initialize = function(router) {
      routes.login = router.addRoute('login', onRouteLogin);
    };

    var destroy = function(router) {
      _.each(routes, function(item) {
        router.removeRoute(item);
      });
    };

    var onRouteLogin = function(options) {
      core.modules.stopAllModules();
      core.modules.startLogin();
    };
    
    return {
        initialize: initialize,
        destroy: destroy
    };
};
