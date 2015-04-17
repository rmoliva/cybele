NS('AdminJS.plugins');

AdminJS.plugins.Init = function(core) {
    'use strict';

    var initialize = function() {
      core.use(scaleApp.plugins.ls);
      core.use(AdminJS.plugins.Promises);
      core.use(AdminJS.plugins.Modules);
      core.use(AdminJS.plugins.Url);
    };

    return {
        initialize: initialize
    };
};
