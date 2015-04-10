NS('AdminJS.plugins');

AdminJS.plugins.Modules = function(core, options) {
    'use strict';

    /* Inicializar el plugin
     */
    var onPluginInit = function(instanceSandbox, options) {};

    var startLayout = function(options) {
      return core.promises.moduleStart(
        "layout", 
        _.merge({el: core.conf.get('el') }, options)
      ).then(function() {
        return Promise.all([
          core.promises.moduleStart(
            "topnav",
            _.merge({el: '#topnav' }, options)
          ),
          core.promises.moduleStart(
            "sidebar",
            _.merge({el: '#sidebar' }, options)
          )
        ]);
      }).then(function() {
        return core.promises.moduleStart("simplify", options);
      });
    };
    
    var startLogin = function(options) {
      return core.promises.moduleStart(
        "login", 
        _.merge({el: core.conf.get('el') }, options)
      ).then(function() {
        return core.promises.moduleStart("simplify", options);
      });
    };

    var stopAllModules = function() {
      var stop_promises = _.map(core.lsInstances(), function(instance) {
        return core.promises.moduleStop(instance);
      });
      return Promise.all(stop_promises);
    };
    
    /* Liberar medios
     */
    var onPluginDestroy = function() {};

    // Extender el core
    _.extend(core, {
        modules: {
          startLayout: startLayout,
          stopAllModules: stopAllModules,
          startLogin: startLogin
        }
    }, this);

    // Extender el sandbox
    _.extend(core.Sandbox.prototype, {
        modules: {
          startLayout: startLayout,
          stopAllModules: stopAllModules,
          startLogin: startLogin
        }
    }, this);

    return {
        init: onPluginInit,
        destroy: onPluginDestroy
        
    };
};
