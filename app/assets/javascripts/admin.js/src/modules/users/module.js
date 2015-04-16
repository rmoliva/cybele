NS('AdminJS.modules.users');

AdminJS.modules.users.Module = function(sb) {
    'use strict';

    var $el = null;
    var model = null;
    var controller = null;
    var fsm = null;

    var initialize = function(opts, done) {
        $el = $(opts.el);
        
        model = new AdminJS.modules.users.Model(sb);
        controller = new AdminJS.modules.users.Controller(sb, fsm, model);

        var fsm = new PromiseStateMachine({
          initial: 'none',
          events: {
            init: { from: 'none', to: 'index' },
            page: { from: 'index', to: 'index' },
            filter: { from: 'index', to: 'index' }
          }
        });

        fsm.on('init', function(event, from, to, anyArgs) {
          return sb.promises.reactRender(
              opts.el,
              AdminJS.components.adminjs.Users, {
                controller: controller,
                model: model
              }
          );
          return Promise.resolve('result 1');
        });        
        
        fsm.init().then(function() {
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
