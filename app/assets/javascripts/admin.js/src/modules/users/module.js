NS('AdminJS.modules.users');

AdminJS.modules.users.Module = function(sb) {
    'use strict';

    var el = null;
    var model = null;
    var controller = null;

    var initialize = function(opts, done) {
        el = opts.el;
        
        model = immstruct({
          object: 'users',
          loading_spinner: false,
          state: 'index',
          show_detroy_confirmation: false,
          records: [],
          record_sel: null,
          page: 1,
          per_page: 15,
          total: 1, // Numero total de registros
          page_count: 5 // Numero de paginas segun el numero de registros
        });
        
        AdminJS.lib.ControllerCreator.create(
            AdminJS.modules.users.Controller(sb, model),
            opts // Es lo mismo que se pasara al handleInit
        ).then(function(ctl) {;
          controller = ctl;
          model.on('swap', doRender);
          return doRender();
        }).then(done);      
    };

    var doRender = function(newStructure, oldStructure, keyPath) {
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
