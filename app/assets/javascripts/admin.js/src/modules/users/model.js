NS('AdminJS.modules.users');

AdminJS.modules.users.FSM = function(sb) {
	var stream_dispatcher = sb.streams.signal(sb);
	
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

    var do_transition = function(transition, options) {
      return ockham_fsm.doTransition(transition, options).then(function(ret) {
    	  stream_dispatcher.dispatch(ret);
      });
    };
	
	return {
		do_transition: do_transition,
		stream: stream_dispatcher.stream
	};
};


AdminJS.modules.users.Model = (function() {
  var creator = function(sb, dispatcher_stream) {
	var fsm = new AdminJS.modules.users.FSM(sb);
	  
    var stateProperty = fsm.stream;
    var perPageProperty = Kefir.constant(10);
    var spinnerStream = Kefir.pool();
    var spinnerProperty = spinnerStream.toProperty();
    
    var showSpinner = function() {
      spinnerStream.plug(Kefir.constant(true));
    };
    var hideSpinner = function() {
      spinnerStream.plug(Kefir.constant(false));
    };
    
    var pageProperty = dispatcher_stream.filter(function(event) {
      return event.action === 'page';
    }).map(function(event) {
      return event.options.page;
    }).toProperty(function() {
    	return 1;
    });
    
    var showIdSelectedStream = dispatcher_stream.filter(function(event) {
      return "show" === event.action;
    }).map(function(event) {
      return event.options.row.id;
    });
    
    dispatcher_stream.onValue(function(options) {
    	fsm.do_transition(options.action);
    });
    
    var idSelectedStream = showIdSelectedStream.toProperty(function() {
      return null;
    });
    
    var responseSlectedStream = showIdSelectedStream.flatMapLatest(function(id) {
      return Kefir.fromPromise( sb.services.get(
          "users", 'show', {id: id}
        )
      );
    });
    
    var selectedProperty = responseSlectedStream.map(function(data) {
      return data.data;
    }).toProperty(function() {
      return null;
    });
    
    var clearSelected = function() {
      selectedProperty.push(null);
    };
    
    var responseStream = pageProperty.flatMapLatest(function(page) {
      showSpinner();
      return Kefir.fromPromise( sb.services.get(
          "users", 'index', {page: page, per_page: 10}
        ).then(function(data) {
          hideSpinner();
          return data;
        })
      );
    });
  
    var recordsProperty = responseStream.map(function(data) {
      return data.data;
    }).toProperty(function() {
      return [];
    });
  
    var totalProperty = responseStream.map(function(data) {
      return data.total;
    }).toProperty(function() {
      return 0;
    });
    
    var pageCountProperty = Kefir.combine([
      totalProperty,
      perPageProperty
      ],
      function(total, per_page) {
        return parseInt(total/per_page,10)+1;
      }
    );
    var stream = Kefir.combine([
        pageProperty, 
        perPageProperty,
        recordsProperty,
        totalProperty,
        pageCountProperty,
        stateProperty,
        selectedProperty,
        spinnerProperty
	   ],
	   function(page, per_page, records, total, page_count, state, selected,spinner) {
    	return {
	        page: page, 
	        per_page: per_page,
	        records: records,
	        total: total,
	        page_count: page_count,
	        state: state.to,
	        selected: selected,
	        spinner: spinner
    	};
	  }
    );

    var initialize = function(options) {
      return fsm.do_transition('init');
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
