NS('AdminJS.modules.topnav');

AdminJS.modules.topnav.Module = function(sb) {
    'use strict';

    var $el = null;
    var model = null;
    var controller = null;
    
    var initialize = function(opts, done) {
      var user_name;
      $el = $(opts.el);

      model = AdminJS.modules.topnav.Model.create(sb);
      controller = new AdminJS.modules.topnav.Controller(sb, model);

      sb.promises.reactRender(
          opts.el,
          AdminJS.components.adminjs.Topnav, {
            controller: controller,
            model: model
          }
      ).then(function(component) {
        user_name = sb.session.getCurrentUserCompleteName();
        model.set("user_name", user_name);
        done();
      });
    };

    var destroy = function() {
        // Quitar la plantilla
        $el.empty();
    };

    return {
        init: initialize,
        destroy: destroy
    };
};
