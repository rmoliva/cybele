NS('AdminJS.lib');

AdminJS.lib.Controller = function(sb, fsm, model, handlers) {
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
