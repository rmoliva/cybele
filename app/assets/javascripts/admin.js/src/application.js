NS("AdminJS");

AdminJS.app = function(options) {
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

        configuration = new AdminJS.Configuration(core, options);
        session = new AdminJS.Session(core);
        services = new AdminJS.services.Init(core);
        i18n = new AdminJS.I18n(core);
        plugins = new AdminJS.plugins.Init(core);
        modules = new AdminJS.modules.Init(core);
        router = new AdminJS.routes.Init(core);

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
        configuration.initialize();
        
        session.initialize();

        // Inicializar i18n
        i18n.initialize();
        
        // Hacer global la funcion de traduccion
        window.t = i18n.t;

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
