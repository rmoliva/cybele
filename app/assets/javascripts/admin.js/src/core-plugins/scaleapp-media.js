NS('AdminJS.corePlugins');

AdminJS.corePlugins.ScaleAppMedia = function(core, options) {
    'use strict';

    /* Inicializar el plugin
     */
    var onPluginInit = function(instanceSandbox, options) {};

    /* Liberar medios
     */
    var onPluginDestroy = function() {};

    // Extender el core
    _.extend(core, {
        media: AdminJS.media
    }, this);

    // Extender el sandbox
    _.extend(core.Sandbox.prototype, {
        media: AdminJS.media
    }, this);

    return {
        init: onPluginInit,
        destroy: onPluginDestroy
    };
};
