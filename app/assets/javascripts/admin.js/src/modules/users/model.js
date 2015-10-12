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
	
	// Function helpers
    var showSpinner = function() {
    	spinner_stream.plug(Kefir.constant(true));
    };
    
    var hideSpinner = function() {
    	spinner_stream.plug(Kefir.constant(false));
    };

    var promiseService = function(model, action, options) {
		showSpinner();
		return sb.services.get(
			model, action, options
		).then(function(data) {
			hideSpinner();
			return data;
		});		
	};
    
	var kefirFetch = function(action, options) {
		return Kefir.fromPromise(promiseService("users", action, options));
	};
	
	// Curry fetch
	var kefirFetchIndex = function(options) {
		return kefirFetch('index', options);
	};
	var kefirFetchShow = function(options) {
		return kefirFetch('show', options);
	};
	
	// First level Streams
    var spinner_stream = Kefir.pool();
	// FSM
	var fsm_index_stream = fsm.stream.filter(function(event) {
      return event.to === 'index';
    });
	var fsm_init_stream = fsm.stream.filter(function(event) {
      return event.transition === 'init';
    });
	
    var fsm_state_name = fsm.stream.map(function(data) {
    	return data.to;
    });
	
	// JSX
	var jsx_show_stream = input_streams.jsx_stream.filter(function(event) {
		return "show" === event.action;
	}); 
	var jsx_page_stream = input_streams.jsx_stream.filter(function(event) {
		return "page" === event.action;
	}); 
	
	// Second Level Streams
	var page_jsx_stream = Kefir.constant(1).merge(
		jsx_page_stream.map(function(event) {
			return event.options.page;
		})
	);

	var show_id_stream = jsx_show_stream.map(function(event) {
		return event.options.row.id;
	});
	
	// Fetch init Stream
	var fetch_init_stream = fsm_init_stream.flatMapLatest(function(event) {
		return kefirFetchIndex({page: 1, per_page: 10});
	});
	
	// Fetch Index Stream
	var fetch_index_stream = page_jsx_stream.flatMapLatest(function(page) {
		return kefirFetchIndex({page: page, per_page: 10});
	});

	var records_stream = fetch_init_stream.merge(fetch_index_stream).map(function(data) {
	      return data.data;
    });
	
	var total_stream = fetch_init_stream.merge(fetch_index_stream).map(function(data) {
	      return data.total;
	});
	
	// Fetch Show Stream
	var fetch_show_stream = show_id_stream.flatMapLatest(function(id) {
		return kefirFetchShow({id: id});
	});

	var selected_stream = fetch_show_stream.map(function(data) {
	    return data.data;
    });

    var initialize = function() {
    	return fsm.initialize();
    };

    return {
    	initialize: initialize,
		fsm_state_name: fsm_state_name, 
		page_stream: page_jsx_stream,
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
	var properties = {
	    state: streams.fsm_state_name.toProperty(),
	    per_page: Kefir.constant(10),
	    page: streams.page_stream.toProperty(function() {
	    	return 1;
	    }),
	    selected: streams.selected_stream.toProperty(function() {
	    	return null;
	    }),
	    records: streams.records_stream.toProperty(function() {
	      return [];
	    }),
	    total: streams.total_stream.toProperty(function() {
	      return 0;
	    }),
	    spinner: streams.spinner_stream.toProperty(function() {
	    	return false;
	    })
	};
	properties.page_count = Kefir.combine([
      properties.total,
      properties.per_page
      ],
      function(total, per_page) {
        return parseInt(total/per_page,10)+1;
      }
    );
	
	var getPropertyKeys = function() {
		return Object.keys(properties);
	};
	
	var getPropertyValues = function() {
		return getPropertyKeys().map(function(v) { return properties[v]; });
	};
	
    var stream = Kefir.combine([
       properties.state,
       properties.per_page,
       properties.page,
       properties.selected,
       properties.records,
       properties.total,
       properties.page_count,
       properties.spinner
   ], function(
	   state,
	   per_page,
	   page,
	   selected,
	   records,
	   total,
	   page_count,
	   spinner
	) {
      return {
    	  state: state,
    	  per_page: per_page,
	      page: page,
		  selected: selected,
		  records: records,
		  total: total,
		  page_count: page_count,
		  spinner: spinner
      };
    });

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
