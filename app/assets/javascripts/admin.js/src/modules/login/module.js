NS('AdminJS.modules.login');

AdminJS.modules.login.Module = function(sb) {
    'use strict';

    var el = null;
    var fsm = null;
    var model = null;
    var controller = null;

    var initialize = function(opts, done) {
        el = opts.el;
        
        model = AdminJS.lib.Model.create(sb, {
          spinner: false, 
          state: 'login',
          email: null,
          remember_me: false
       });

        controller = AdminJS.lib.ControllerCreator.create(
          AdminJS.modules.login.Controller(sb, model),
          opts // Es lo mismo que se pasara al handleInit
        ); 
        sb.promises.reactRender(
            el,
            AdminJS.modules.login.View, {
              controller: controller,
              model: model
            }
        ).then(function(component) {
          done();
        });
    };

    var destroy = function() {
      controller = null;
      
      // Quitar la plantilla
      $(el).empty();
    };

    return {
        init: initialize,
        destroy: destroy
    };
};
