NS('AdminJS.modules.users');

AdminJS.modules.users.Model = (function() {
  var creator = function(sb, dispatcher_stream) {
    var stateProperty = new Bacon.Bus();
    var perPageProperty = Bacon.constant(10);
    var spinnerProperty = new Bacon.Bus();
    
    var showSpinner = function() {
      spinnerProperty.push(true);
    };
    var hideSpinner = function() {
      spinnerProperty.push(false);
    };
    
    var pageProperty = dispatcher_stream.filter(function(event) {
      return event.action === 'page';
    }).map(function(event) {
      return event.options.page;
    }).toProperty(1);
    
    var showIdSelectedStream = dispatcher_stream.filter(function(event) {
      return "show" === event.action;
    }).map(function(event) {
      return event.options.row.id;
    });
    
    var idSelectedStream = showIdSelectedStream.toProperty(null);
    
    var responseSlectedStream = showIdSelectedStream.doAction(
        showSpinner
      ).doAction(
        clearSelected
      ).flatMapLatest(function(id) {
      return Bacon.fromPromise( sb.services.get(
          "users", 'show', {id: id}
        )
      );
    }).doAction(hideSpinner);
    
    var selectedProperty = responseSlectedStream.map(function(data) {
      return data.data;
    }).toProperty(null);
    
    var clearSelected = function() {
      selectedProperty.push(null);
    };
    
    var responseStream = pageProperty.doAction(showSpinner).flatMapLatest(function(page) {
      return Bacon.fromPromise( sb.services.get(
          "users", 'index', {page: page, per_page: 10}
        )
      );
    }).doAction(hideSpinner);
  
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
  
     var ockham_fsm = Ockham.create({
      config: function(fsm) {
        return {
          states: {
            none: {
              init: "index"
            },
            index: {
              page: 'index', // this.pageTransition,
              show: "show_form",
              new: 'new_form',
              create: 'index',
              edit: 'edit_form',
              update: 'index',
              delete: 'delete_form',
              destroy: 'index'
            },
            show_form: {
              states: {
                edit_form: {
                  cancel: 'show_form',
                  update: 'index',
                  delete: 'show_form-edit_form-delete_form',
                  states: {
                    delete_form: {
                      cancel: 'show_form-edit_form',
                    }
                  }
                },
                delete_form: {
                  cancel: 'show_form',
                }
              },
              edit: 'show_form-edit_form',
              delete: 'show_form-delete_form',
              cancel: 'index',
              destroy: 'index'
            },
            new_form: {
              create: 'index',
              cancel: 'index'
            },
            edit_form: {
              states: {
                delete_form: {
                  cancel: 'edit_form',
                  destroy: 'index'
                }
              },
              cancel: 'index',
              update: 'index',
              delete: 'edit_form-delete_form'
            },
            delete_form: {
              destroy: 'index',
              cancel: 'index'
            }
          }
        };
      }
    });
    
    var handleTransition = function(transition) {
      return function(options) {
        return ockham_fsm.doTransition(transition, options).then(function(ret) {
          console.log(ret);
          stateProperty.push(ret.to);
        });
      };
    };
    
    dispatcher_stream.onValue(function(event){
      return ockham_fsm.doTransition(event.action, event.options).then(function(ret) {
        console.group("STATE");
        console.log(ret.to);
        console.groupEnd();
        stateProperty.push(ret.to);
      });      
    });    
    
    var stream = Bacon.combineTemplate({
      page: pageProperty, 
      per_page: perPageProperty,
      records: recordsProperty,
      total: totalProperty,
      page_count: pageCountProperty,
      state: stateProperty,
      selected: selectedProperty,
      spinner: spinnerProperty
    });  
  
    var initialize = function(options) {
      return handleTransition('init')(options);
    };
  
    return {
      initialize: initialize,
      stream: stream
    };
  };

  return {
    create: creator
  };
}());
