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

    /** 
     * Inicializa la aplicacion
     */
    var initialize = function() {     
        // inicializar el scaleApp
        core = new scaleApp.Core();

        configuration = new AdminJS.Configuration(core, options);
        services = new AdminJS.services.Init(core);
        i18n = new AdminJS.I18n(core);
        plugins = new AdminJS.plugins.Init(core);
        modules = new AdminJS.modules.Init(core);
        router = new AdminJS.routes.Init(core);

        // Inicializar los plugins del Core
        plugins.initialize();

        // Inicializar el core
        core.boot();

        // Inicializar servicios
        services.initialize();
        
        // Inicializar la configuracion
        configuration.initialize().then(function() {
          console.log("then....");
          
          // Inicializar i18n
          i18n.initialize();

          // Hacer global la funcion de traduccion
          window.t = i18n.t;
          
          // Inicializar modulos
          modules.initialize();

          // Incializar el router
          router.initialize();
          
          core.on("services.unauthorized", function(data) {
            console.log("services.unauthorized");
          });
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
