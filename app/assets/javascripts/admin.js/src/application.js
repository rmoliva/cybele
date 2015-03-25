NS("AdminJS");

AdminJS.app = function(options) {
    "use strict";

    var core = null;
    var plugins = null;
    var modules = null;
    var router = null;

    /**
     * setup hasher
     * @newHash <String>
     * @oldHash <String>
     */

    function parseHash(newHash, oldHash) {
        if (newHash == '') {
            // redirect to "home" hash without keeping the empty hash on the history
            hasher.replaceHash('dashboard');
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
     * Inicializa la aplicacion
     */
    var initialize = function() {
        moment.locale(options.locale);

        // inicializar el scaleApp
        core = new scaleApp.Core();

        // Inicializar los plugins del Core
        plugins = new AdminJS.PluginInit(core);
        plugins.initialize();

        // Inicializar modulos
        modules = new AdminJS.ModuleInit(core);
        modules.initialize();
        
        // Inicializar el core
        core.boot();

        router = crossroads.create();

        router.addRoute('dashboard', onRouteDashboard);
        router.routed.add(console.log, console); //log all routes

        hasher.initialized.add(parseHash); //parse initial hash
        hasher.changed.add(parseHash); //parse hash changes
        hasher.init(); //start listening for history change
        
    };

    // Parar todos los modulos
    var promiseStopContentModules = function() {
      return Promise.all(_.map(core.lsInstances(), function(instance) {
        core.promises.moduleStop(instance);
      }));
    };

    var onRouteDashboard = function() {
      promiseStopContentModules().then(function() {
        return core.promises.moduleStart("layout", options);
      }).then(function() {
        return core.promises.moduleStart("topnav", {el: '#topnav'});
      }).then(function() {
      }).done();
    };

    var destroy = function() {
        modules.destroy();
        plugins.destroy();
    };

    return {
        initialize: initialize,
        destroy: destroy
    };
};
