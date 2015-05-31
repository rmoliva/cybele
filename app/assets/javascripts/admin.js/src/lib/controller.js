NS('AdminJS.lib');

AdminJS.lib.Controller = function(handlers) {
    'use strict';
    
    var callHandler = function(name, options, scope) {
      var handler = handlers[name];
      
      if(!handler) {
        // console.log("No handler function found: "+name+" in handlers: "+Object.keys(handlers).join(','));
        return;
      }
      return _.bind(handler, scope || this)(options);
    };

    return {
      call: callHandler
    };
};

/**
 * Todos los controladores deben tener una funcion denominada HandleInit
 * que es con la que se inicia el controlador.
 * Reciben el objeto **options** pasado en el creador
 */
AdminJS.lib.ControllerCreator = (function() {
  return {
    create: function(handlers, options) {
      var controller = new AdminJS.lib.Controller(handlers);
      controller.call("handleInit", options);
      return controller;
    }
  };
}());
