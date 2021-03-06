NS('AdminJS.modules');

AdminJS.modules.Init = function(core) {
    'use strict';

    var modules = {
        notification: AdminJS.modules.notification.Module,
        layout: AdminJS.modules.layout.Module,
        topnav: AdminJS.modules.topnav.Module,
        sidebar: AdminJS.modules.sidebar.Module,
        simplify: AdminJS.modules.simplify.Module,
        login: AdminJS.modules.login.Module,
        users: AdminJS.modules.users.Module
    };

    /**
     * Registra todos los módulos de la aplicación Configurations en scaleApp
     */
    var initialize = function() {
        // Registrar los modulos en el application
        _.each(modules, function(module, name) {
            core.register(name, module);
        });
    };

    /**
     * Parar los modulos y desregistrar todos
     */
    var destroy = function() {
        var running = core.lsInstances();

        _.each(modules, function(module, name) {
            // Si el modulo esta arrancado, pararlo
            if (_.contains(running, name)) {
                core.stop(name);
            }
        });
    };

    return {
        initialize: initialize,
        destroy: destroy
    };
};
