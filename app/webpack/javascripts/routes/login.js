module.exports = function(core) {
  'use strict';
  
  var routes = {
    login: null,
    forgot_password: null,
    register: null
  };
  
  var initialize = function(router) {
    routes.login = router.addRoute('login', onRouteLogin);
    routes.forgot_password = router.addRoute('forgot_password', onRouteForgotPassword);
    routes.register = router.addRoute('register', onRouteRegister);
  };
  
  var destroy = function(router) {
    _.each(routes, function(item) {
      router.removeRoute(item);
    });
  };
  
  var onRouteLogin = function() {
    core.modules.stopAllModules();
    core.modules.startLogin({
      state: 'signin'
    });
  };
  
  var onRouteForgotPassword = function() {
    core.modules.stopAllModules();
    core.modules.startLogin({
      state: 'forgot_password'
    });
  };
  
  var onRouteRegister = function() {
    core.modules.stopAllModules();
    core.modules.startLogin({
      state: 'register'
    });
  };
  
  return {
    initialize: initialize,
    destroy: destroy
  };
};