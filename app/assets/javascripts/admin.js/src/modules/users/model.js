NS('AdminJS.modules.users');

AdminJS.modules.users.FSM = function(sb, input_stream) {
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
      return ockham_fsm.doTransition(transition, options).then(function(event) {
    	  stream_dispatcher.dispatch(event);
      });
    };

    input_stream.onValue(function(options) {
    	do_transition(options.action, options.options);
    });
	
    var initialize = function() {
    	return do_transition("init");
    };
    
	return {
		initialize: initialize,
		stream: stream_dispatcher.stream
	};
};

AdminJS.modules.users.Streams = function(sb, input_streams) {
	var fsm = new AdminJS.modules.users.FSM(sb, input_streams.jsx_stream);

    var showSpinner = function() {
    	spinner_stream.plug(Kefir.constant(true));
    };
    
    var hideSpinner = function() {
    	spinner_stream.plug(Kefir.constant(false));
    };
    
	var index_stream = fsm.stream.filter(function(event) {
      return event.to === 'index';
    });
	
	var show_id_stream = input_streams.jsx_stream.filter(function(event) {
		return "show" === event.action;
	}).map(function(event) {
		return event.options.row.id;
	});
	
	var get_show_stream = show_id_stream.flatMapLatest(function(id) {
		showSpinner();
		return Kefir.fromPromise(sb.services.get(
				"users", 'show', {id: id}
			).then(function(data) {
				hideSpinner();
				return data;
			})
		);
	});

	var selected_stream = get_show_stream.map(function(data) {
	    return data.data;
    });
	
	// El page se obtiene de las opciones de lanzar la transición
	// "page" a la máquina de estados
	var page_stream = fsm.stream.filter(function(event) {
      return event.to === 'index';
    }).map(function(fsm_event) {
		if(fsm_event.options && fsm_event.options.page) {
			return fsm_event.options.page;
		} else {
			return 1;
		}
    });

	var get_index_stream = page_stream.flatMapLatest(function(page) {
		showSpinner();
		return Kefir.fromPromise(sb.services.get(
				"users", 'index', {page: page, per_page: 10}
			).then(function(data) {
				hideSpinner();
				return data;
			})
		);
	});
	
	var records_stream = get_index_stream.map(function(data) {
	      return data.data;
    });

	var total_stream = get_index_stream.map(function(data) {
	      return data.total;
    });

    var spinner_stream = Kefir.pool();
    
    var initialize = function() {
    	return fsm.initialize();
    };

    return {
    	initialize: initialize,
		fsm_stream: fsm.stream,
		page_stream: page_stream,
		selected_stream: selected_stream,
		records_stream: records_stream,
		total_stream: total_stream,
		spinner_stream: spinner_stream
	};
};

AdminJS.modules.users.Model = (function() {
  var creator = function(sb, dispatcher_stream) {
	    
	var streams = new AdminJS.modules.users.Streams(sb, {
		jsx_stream: dispatcher_stream
	});
	  
	// Properties
    var stateProperty = streams.fsm_stream.toProperty();
    stateProperty.log();
    var perPageProperty = Kefir.constant(10);
    var pageProperty = streams.page_stream.toProperty(function() {
    	return 1;
    });
    var selectedProperty = streams.selected_stream.toProperty(function() {
    	return null;
    });
    
    var recordsProperty = streams.records_stream.toProperty(function() {
      return [];
    });
  
    var totalProperty = streams.total_stream.toProperty(function() {
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

    var spinnerProperty = streams.spinner_stream.toProperty(function() {
    	return false;
    });
    
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
      return streams.initialize();
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
