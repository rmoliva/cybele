NS('AdminJS.modules.users');

AdminJS.modules.users.Module = function(sb) {
    'use strict';

    var el = null;
    var model = null;
    var controller = (function() {
      var signal = new signals.Signal();
      
      var stream = function() {
        return Bacon.fromBinder(function(sink) {
          signal.add(function(event) {
            sink(event);
          });
          return function() {
            signal.removeAll();
          };
        }); 
      };     
      
      var call = function(message, options) {
        signal.dispatch({
          msg: message,
          options: options
        });
      };
      
      return {
        call: call,
        stream: stream
        
      };
    }());

    var initialize = function(opts, done) {
        el = opts.el;
        
        controller.stream().log();
        
        var pageLinkStream = controller.stream().filter(function(event) {
          return (event.msg === "handlePageClick"); 
        });       
        
        var perPageProperty = Bacon.constant(20);

        var pageProperty = pageLinkStream.map(function(event) {
          return event.options.page;
        }).toProperty(1); 

        var responseStream = pageProperty.flatMapLatest(function(page) {
          return Bacon.fromPromise( sb.services.get(
              "users", 'index', {page: page, per_page: 20}
            )
          );
        }); 
        
        var recordsProperty = responseStream.map(function(data) {
          return data.data;
        }).toProperty([]);
        
        var totalProperty = responseStream.map(function(data) {
          return data.total;
        }).toProperty(0);
        
        var pageCountProperty = Bacon.combineWith(function(total, per_page) {
            return parseInt(total/per_page,10)+1;
          },
          totalProperty,
          perPageProperty
        );

        Bacon.combineTemplate({
          page: pageProperty, 
          per_page: perPageProperty,
          records: recordsProperty,
          total: totalProperty,
          page_count: pageCountProperty
        }).onValue(function(model) {
          doRender(model);
        });
        
/*        AdminJS.lib.ControllerCreator.create(
            AdminJS.modules.users.Controller(sb, model),
            opts // Es lo mismo que se pasara al handleInit
        ).then(function(ctl) {;
          // controller = ctl;
          model.on('swap', doRender);
          return doRender();
        }).then(done);
 */
        done();        
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
