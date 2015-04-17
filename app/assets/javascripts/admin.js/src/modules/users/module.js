NS('AdminJS.modules.users');

AdminJS.modules.users.Module = function(sb) {
    'use strict';

    var $el = null;
    var model = null;
    var controller = null;

    var initialize = function(opts, done) {
        $el = $(opts.el);
        
        model = new AdminJS.modules.users.Model(sb);
        model.on.hash_changed.add(onHashChanged);
        
        controller = new AdminJS.modules.users.Controller(sb, model, opts);
        
        controller.call('initialize', opts).then(function() {
          done();
        });
    };
    
    var onHashChanged = function(params){
      sb.hash.setSilently('users?'+sb.url.encodeHash(params));
    }

    var destroy = function() {
        // Quitar la plantilla
        $el.empty();
    };

    return {
        init: initialize,
        destroy: destroy
    };
};
