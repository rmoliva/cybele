NS('AdminJS.corePlugins');

AdminJS.corePlugins.ScaleAppPromises = function(core, options) {
    'use strict';

    var moduleStart = function(module, options) {
        return new Promise(function(resolve, error) {
            core.start(module, {
                    options: options
                },
                resolve
            );
        });
    };

    var moduleStop = function(module) {
        return new Promise(function(resolve, error) {
            core.stop(module, function() {
                resolve();
            });
        });
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
          data: {app: 'central', entity_id: null},
          success: function(data) {
            if(data.success) {
              resolve(data.data);
            } else {
              reject(data.data);
            }
          },
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
