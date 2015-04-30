NS('AdminJS.routes');

AdminJS.routes.Users = function(core) {
    'use strict';
    
    var routes = {
        users: null
    };
    

    var initialize = function(router) {
      routes.users = router.addRoute('users/:id::?params:', onRouteUsers);
    };

    var destroy = function(router) {
      _.each(routes, function(item) {
        router.removeRoute(item);
      });
    };

    var onRouteUsers = function(id, params) {
      core.modules.startLayout(
        {sidebar_active: 'users_submenu'}
      ).then(function() {
        return core.promises.moduleStart(
          'users', {
           el: '#main-container',
           id: id,
           params: params
        });
      });
    };

    return {
        initialize: initialize,
        destroy: destroy
    };
};
