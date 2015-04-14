NS('AdminJS.services');

AdminJS.services.Init = function(core) {
    'use strict';

    /**
     * Trata los valores devueltos por los reiqests
     * @data <Object> Datos devueltos por el request
     * @status <String> Indica si el resultado del request ha sido satisfactorio o no
     * @xhr
     * @success <Function> Función a ejecutar cuando se produce success en el request
     * @error <Function> Función a ejecutar cuando se produce un error en el request
     */
    var _decoder = function(data, status, xhr, success, errorfn) {
      if (status === "success") {
        if(data.suceess) {
          success(data, status);
        } else {
          _notifyError(data.message, data, errorfn);
        }
      } else if (status === "fail" || status === "error") {
        if(xhr.status === 401) {
          console.log("Unauthorized");
          core.emit("services.unauthorized", data);
          // Hemos notificado convenientemente... lo tratamos como algo normal 
          success(data, status);
        } else {
          _notifyError(xhr.responseText, {}, errorfn);
        }
      }
    };
    
    var _notifyError = function(message, data, errorfn) {
      core.emit('notification.message', {message: message, data: data, type: 'error'});
      errorfn(message, data);
    };
    
    var services = {
      current_user: new AdminJS.services.CurrentUser(core),
      sessions: new AdminJS.services.Sessions(core)
    };
    
    var initialize = function() {
      _.each(services, function(service) {
        service.initialize(_decoder);
      }, this);
    };

    var destroy = function() {
      _.each(services, function(service) {
        service.destroy();
      }, this);
    };
    
    var get = function(service, action, options, scope) {
      var srv = services[service];
      
      options = options || {};
      return _.bind(srv[action], scope || this)(options);
    };
    
    var authToken = function() {
      return $('meta[name="csrf-token"]').attr('content');
    };
    
    // Extender el core
    _.extend(core, {
        services: {
            get: get
        }
    }, this);

    // Extender el sandbox
    _.extend(core.Sandbox.prototype, {
      services: {
        get: get
      }
    }, this);

    return {
        initialize: initialize,
        destroy: destroy
    };
};
