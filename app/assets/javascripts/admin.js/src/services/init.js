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
        if(data.success) {
          success(data, status);
        } else {
          _notifyError(data.message, data, errorfn);
        }
      } else if (status === "fail" || status === "error") {
        if(xhr.status === 401) {
          console.log("Unauthorized");
          core.emit("services.unauthorized", data);
          // Hemos notificado convenientemente... lo tratamos como algo normal 
          success({data: null}, status);
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
      sessions: new AdminJS.services.Sessions(core),
      users: new AdminJS.services.Users(core)
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
      var action = _getAction(service, action);
      
      options = options || {};
      options = _.merge(options, {app: 'central'});

      if(action) {
        return _.bind(action, scope || this)(options);
      }
    };
    
    var _getAction = function(service, action) {
      var srv = services[service];
      
      if(!srv) {
        console.log("No service found: "+service+". Only services: "+Object.keys(services).join(','));
        return;
      }
      
      if(!srv[action]) {
        console.log("No action found: "+action+" in service: "+service);
        return;
      }
      return srv[action]
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
