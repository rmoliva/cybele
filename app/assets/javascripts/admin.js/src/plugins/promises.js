NS('AdminJS.plugins');

AdminJS.plugins.Promises = function(core, options) {
    'use strict';

    var _isModuleRunning = function(module) {
      return _.findIndex(core.lsInstances(), function(instance) {
        return instance === module;
      }) >= 0;
    };
    
    
    var moduleStart = function(module, options) {
      // Parar siempre el modulo antes, por si acaso
      return moduleStop(module).then(function() {
        return new Promise(function(resolve, error) {
          core.start(module, {
                  options: options
              },
              resolve
          );
        });
      });
    };

    var moduleStop = function(module) {
      // Si el modulo no esta arrancado, no pararlo
      if(_isModuleRunning(module)) {
        return new Promise(function(resolve, error) {
          core.stop(module, function() {
              resolve();
          });
        });
      } else {
        return Promise.resolve();
      }
    };

    var timeout = function(secs) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, secs * 1000);
        });
    };

    var reactRender = function(component, element) {
        var object = null;

        return new Promise(function(resolve, reject) {
            object = React.render(
                component,
                element,
                resolve
            );
        }).then(function() {
            return object;
        });
    };

    var promiseRequest = function(resourceId, data) {
      return new Promise(function(resolve, reject) {
        amplify.request({
          resourceId: resourceId, 
          data: data,
          success: resolve,
          error: reject
        });
      });
    };
    
    /* Inicializar el plugin
     */
    var onPluginInit = function(instanceSandbox, options) {};

    /* Liberar medios
     */
    var onPluginDestroy = function() {};

    // Extender el core
    _.extend(core, {
        promises: {
            moduleStart: moduleStart,
            moduleStop: moduleStop,
            timeout: timeout,
            reactRender: reactRender,
            promiseRequest: promiseRequest
        }
    }, this);

    // Extender el sandbox
    _.extend(core.Sandbox.prototype, {
        promises: {
            moduleStart: moduleStart,
            moduleStop: moduleStop,
            timeout: timeout,
            reactRender: reactRender,
            promiseRequest: promiseRequest
        }
    }, this);

    return {
        init: onPluginInit,
        destroy: onPluginDestroy
    };
};
