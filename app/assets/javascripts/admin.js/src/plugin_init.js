NS('AdminJS');

AdminJS.PluginInit = function(core) {
    'use strict';

    var initialize = function() {
        core.use(AdminJS.corePlugins.ScaleAppPromises);
        core.use(scaleApp.plugins.ls);
    };

    return {
        initialize: initialize
    };
};
