NS('AdminJS.modules.users');

AdminJS.modules.users.Module = function(sb) {
    'use strict';

    var el = null;
    var model = null;
    var controller = null;

    var initialize = function(opts, done) {
        el = opts.el;
        
      var mediator = AdminJS.modules.users.Controller(sb, model);
      mediator.model.onValue(function(template) {
        doRender(template);
      });
      
      AdminJS.lib.ControllerCreator.create(
          mediator,
          opts // Es lo mismo que se pasara al handleInit
      ).then(function(ctl) {;
        controller = ctl;
        done();
      });
    };

    var doRender = function(model) {
      return sb.promises.reactRender(
          el,
          AdminJS.modules.users.View, {
            controller: controller,
            model: model
          }
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
