layout = require('./layout/module')
notification = require('./notification/module')
login = require('./login/module')
simplify = require('./simplify/module')

module.exports = function(core) {
    'use strict';

    var modules = {
        notification: notification,
        layout: layout,
        // topnav: AdminJS.modules.topnav.Module
        // sidebar: AdminJS.modules.sidebar.Module
        simplify: simplify,
        login: login
        // users: AdminJS.modules.users.Module
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