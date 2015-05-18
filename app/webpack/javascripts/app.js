
var App, modules, plugins, routes, services, session;

plugins_init = require('./plugins/init');
services_init = require('./services/init');
routes_init = require('./routes/init');
modules_init = require('./modules/init');
session_init = require('./session');

module.exports = function(options) {
    "use strict";

    var core = null;
    var plugins = null;
    var modules = null;
    var configuration = null;
    var router = null;
    var i18n = null;
    var services = null;
    var session = null;

    /** 
     * Inicializa la aplicacion
     */
    var initialize = function() {
        // inicializar el scaleApp
        core = new scaleApp.Core();

        // configuration = new AdminJS.Configuration(core, options);
        session = new session_init(core);
        services = new services_init(core);
        // i18n = new AdminJS.I18n(core);
        plugins = new plugins_init(core);
        modules = new modules_init(core);
        router = new routes_init(core);

        // Inicializar los plugins del Core
        plugins.initialize();

        // Inicializar el core
        core.boot();

        core.on("services.unauthorized", function(data) {
          console.log("services.unauthorized");
          core.hash.setHash('login');
        });

        // Inicializar servicios
        services.initialize();

        // Inicializar la configuracion
        // configuration.initialize();
        
        session.initialize();

        // Inicializar i18n
        // i18n.initialize();
        
        // Hacer global la funcion de traduccion
        // window.t = i18n.t;

        session.loadCurrentUser().then(function() {
          // Inicializar modulos
          modules.initialize();

          // Incializar el router
          router.initialize();
        });
    };

    var destroy = function() {
        modules.destroy();
        plugins.destroy();
        i18n.destroy();
    };

    return {
        initialize: initialize,
        destroy: destroy
    };
};

