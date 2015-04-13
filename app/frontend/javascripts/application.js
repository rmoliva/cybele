
scaleApp = require('scaleapp');

module.exports = function(options) {
    "use strict";
    
    var core = null;

    var initialize = function() {
      console.log(scaleApp);
      
      // inicializar el scaleApp
      core = new scaleApp.Core();
    };

    var destroy = function() {
    };

    return {
        initialize: initialize,
        destroy: destroy
    };
};
