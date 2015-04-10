NS('AdminJS.routes');

AdminJS.routes.Init = function(core) {
    'use strict';

    var router = null;
    var route_managers = {
        dashboard: new AdminJS.routes.Dashboard(core),
        login: new AdminJS.routes.Login(core)
    };

    /**
     * setup hasher
     * @newHash <String>
     * @oldHash <String>
     */

    function _parseHash(newHash, oldHash) {
        if (newHash == '') {
            // redirect to "home" hash without keeping the empty hash on the history
          if(core.conf.get('current_user')) {
            hasher.replaceHash('dashboard');
          } else {
            hasher.replaceHash('login');
          }
        } else {
            router.parse(newHash);
        }
    };

    /**
     * Cambia la url pero sin que se lancen las señales (no se redirige)
     * @hash <String> nuevo hash (porción de url) a introducir
     */

    function setHashSilently(hash) {
        hasher.changed.active = false; //disable changed signal
        hasher.setHash(hash); //set hash without dispatching changed signal
        hasher.changed.active = true; //re-enable signal
    };
    
    /**
     * Registra todos los módulos de la aplicación Configurations en scaleApp
     */
    var initialize = function() {
      router = crossroads.create();
      _initalizeRouteManagers();
      router.routed.add(console.log, console); //log all routes
      hasher.initialized.add(_parseHash); //parse initial hash
      hasher.changed.add(_parseHash); //parse hash changes
      hasher.init(); //start listening for history change
    };

    var _initalizeRouteManagers = function() {
      _.each(route_managers, function(route_manager) {
        route_manager.initialize(router);
      }, this);
    };
    
    /**
     * Parar los modulos y desregistrar todos
     */
    var destroy = function() {
      hasher.dispose();
      _destroyRouteManagers();
    };

    var _destroyRouteManagers = function() {
      _.each(route_managers, function(route_manager) {
        route_manager.destroy(router);
      }, this);
    };
    
    // Extender el core
    _.extend(core, {
        hash: {
            setSilently: setHashSilently
        }
    }, this);

    // Extender el sandbox
    _.extend(core.Sandbox.prototype, {
        hash: {
            setSilently: setHashSilently
        }
    }, this);

    return {
        initialize: initialize,
        destroy: destroy
    };
};
