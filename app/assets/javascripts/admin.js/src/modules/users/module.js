NS('AdminJS.modules.users');

AdminJS.modules.users.Module = function(sb) {
    'use strict';

    var el = null;
    var model = null;
    var dispatcher = null;

    var initialize = function(opts, done) {
        el = opts.el;
        
      var dispatcher = AdminJS.lib.Dispatcher.create(sb);
      var model = AdminJS.modules.users.Model.create(sb, dispatcher.stream);
      model.stream.onValue(function(template) {
        doRender(template, {
          dispatcher: dispatcher,
          model: template
        });
      });
      var init = model.initialize(); 
      
      init.then(function() {
        done();
      });
    };

    var doRender = function(template, options) {
      return sb.promises.reactRender(
          el,
          AdminJS.modules.users.View, 
          options
      );
    };

    var destroy = function() {
        // Quitar la plantilla
        $(el).empty();
    };

    return {
        init: initialize,
        destroy: destroy
    };
};
