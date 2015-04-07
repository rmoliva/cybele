NS("AdminJS");

AdminJS.app = function(options) {
    "use strict";

    var core = null;
    var plugins = null;
    var modules = null;
    var configuration = null;
    var router = null;
    var i18n = null;

    /** 
     * Inicializa la aplicacion
     */
    var initialize = function() {
        // inicializar el scaleApp
        core = new scaleApp.Core();

        // Inicializar la configuracion
        configuration = new AdminJS.Configuration(core, options);
        configuration.initialize();
        
        // Inicializar i18n
        i18n = new AdminJS.I18n(core)
        i18n.initialize();

        // Hacer global la funcion de traduccion
        window.t = i18n.t;
        
        // Inicializar los plugins del Core
        plugins = new AdminJS.plugins.Init(core);
        plugins.initialize();

        // Inicializar modulos
        modules = new AdminJS.modules.Init(core);
        modules.initialize();
        
        // Inicializar el core
        core.boot();

        // Incializar el router
        router = new AdminJS.routes.Init(core);
        router.initialize();
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
