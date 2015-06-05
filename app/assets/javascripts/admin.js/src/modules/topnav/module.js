NS('AdminJS.modules.topnav');

AdminJS.modules.topnav.Module = function(sb) {
    'use strict';

    var el = null;
    var model = null;
    var controller = null;
    
    var initialize = function(opts, done) {
      el = opts.el;
      
      model = immstruct('topnav_model',{
        user_name: sb.session.getCurrentUserCompleteName()
      });
      
      AdminJS.lib.ControllerCreator.create(
          AdminJS.modules.topnav.Controller(sb, model),
          opts // Es lo mismo que se pasara al handleInit
      ).then(function(ctl) {
        controller = ctl;
        return doRender(done); 
      }).then(function() {
        model.on('swap', doRender);
        done();
      });
    };
    
    var doRender = function(newStructure, oldStructure, keyPath) {
      return sb.promises.reactRender(
          el,
          AdminJS.modules.topnav.View, {
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
