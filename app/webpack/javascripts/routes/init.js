hasher = require('hasher')
crossroads = require('crossroads')
login_route = require('./login')

module.exports = function(core) {
    'use strict';

    var router = null;
    var route_managers = {
      // dashboard: new (AdminJS.routes.Dashboard)(core)
      login: new login_route(core)
      // users: new (AdminJS.routes.Users)(core)
    };

    /**
     * setup hasher
     * @newHash <String>
     * @oldHash <String>
     */

    function _parseHash(newHash, oldHash) {
      var not_loggedin_hashes = ["", "login", "register", "forgot_password"]
      hasher.replaceHash('login');
      router.parse('login');
      return;
      
      if(!core.session.isAuthenticated()) {
        hasher.replaceHash('login');
        router.parse('login');
        return;
      }
      
      if (_.include(not_loggedin_hashes, newHash)) {
        hasher.replaceHash('dashboard');
      } else {
        router.parse(newHash);
      }
    };

    function _bypassedHandler(req, res, requestString) {
      console.log("404");
      console.log(arguments);
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
    
    function setHash(hash) {
      hasher.setHash(hash);
    };
    
    /**
     * Registra todos los módulos de la aplicación Configurations en scaleApp
     */
    var initialize = function() {
      router = crossroads.create();
      _initalizeRouteManagers();

      router.routed.add(console.log, console); //log all routes
      router.bypassed.add(_bypassedHandler);
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
          setSilently: setHashSilently,
          setHash: setHash
        }
    }, this);

    // Extender el sandbox
    _.extend(core.Sandbox.prototype, {
        hash: {
          setSilently: setHashSilently,
          setHash: setHash
        }
    }, this);

    return {
        initialize: initialize,
        destroy: destroy
    };
};

