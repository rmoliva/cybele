scaleAppLs = require('../lib/scaleApp.ls')
modules = require('./modules')
promises = require('./promises')
url = require('./url')

module.exports = function(core) {
    'use strict';

    var initialize = function() {
      core.use(scaleAppLs);
      core.use(promises);
      core.use(modules);
      core.use(url);
    };

    return {
        initialize: initialize
    };
};
