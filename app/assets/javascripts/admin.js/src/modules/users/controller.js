NS('AdminJS.modules.users');

AdminJS.modules.users.Controller = function(sb, model) {
  'use strict';

  var object = model.cursor().get('object');

  var _loadRecords = function(options) {
    var page = (model.cursor().get('page') || 1), 
      per_page = model.cursor().get('per_page'),
      query_string;
    
    model.cursor().set("loading_spinner", true);
    return sb.services.get(
      object, 'index', {page: page, per_page: per_page}
    ).then(function(data) {
      // Calcular el numero de paginas
      model.cursor().set('page_count', parseInt(data.total/per_page,10)+1);
      model.cursor().set('records', data.data);
      model.cursor().set('total', data.total);
    }).finally(function() {
      model.cursor().set("loading_spinner", false);
    });
  };
  
  var promiseTransition = function(transition, options) {
    var subscriptions = {
      transition: null,
      handling: null,
      handled: null,
      nohandler: null,
      invalidstate: null
    };
    
    return new Promise(function(resolve, reject) {
      subscriptions.transition = index_fsm.on("transition", function() {
        console.group("transitionEvent");
        console.log(index_fsm.compositeState());
        console.groupEnd();
      });

      subscriptions.handling = index_fsm.on("handling", function() {
        console.group("handlingEvent");
        console.log(index_fsm.compositeState());
        console.groupEnd();
      });

      subscriptions.handled = index_fsm.on("handled", function() {
        console.group("handledEvent");
        console.log(index_fsm.compositeState());
        console.groupEnd();
        model.cursor().set('state', index_fsm.compositeState());
        _.each(subscriptions, function(s){s.off();});  
        return resolve(arguments);
      });
      subscriptions.nohandler = index_fsm.on("nohandler", function() {
        console.log("ERROR: nohandler");
        _.each(subscriptions, function(s){s.off();});  
        return reject(arguments);
      });
      subscriptions.invalidstate = index_fsm.on("invalidstate", function() {
        console.log("ERROR: invalidstate");
        _.each(subscriptions, function(s){s.off();});  
        return reject(arguments);
      });
      index_fsm.transition(transition,  options);
    });
  };
  
  var show_fsm = new machina.Fsm({
    namespace: "show_fsm",
    initialState: "show_initial",
    states: {
      show_initial: {
        edit: function(options) {
          return promiseTransition("show_edit", options);
        },
        delete: function(options) {
          return promiseTransition("show_delete", options);
        }
      },
      show_edit: {
        cancel: function(options) {
          return promiseTransition("show_initial", options);
        },
        update: function(options) {
          return promiseTransition("show_initial", options).then(function() {
            return this.handle('update', options);
          });
        }
      },
      show_delete: {
        cancel: function(options) {
          return promiseTransition("show_initial", options);
        },
        destroy: function(options) {
          return promiseTransition("show_initial", options).then(function() {
            return this.handle('destroy', options);
          });
        }
      }
    }
  });
  
  var edit_fsm = new machina.Fsm({
    namespace: "edit_fsm",
    initialState: "edit_initial",
    states: {
      edit_initial: {
        delete: function(options) {
          return promiseTransition("edit_delete", options);
        }
      },
      edit_delete: {
        cancel: function(options) {
          return promiseTransition("edit_initial", options);
        },
        destroy: function(options) {
          return promiseTransition("edit_initial", options).then(function() {
            return this.handle('destroy', options);
          });
        }
      }
    }
  });

  var index_fsm = new machina.Fsm({
    namespace: "index_fsm",
    initialState: "nothing",
    states: {
      nothing: {
        init: function(options) {
          return promiseTransition("index", options).then(function() {
            return _loadRecords(options);
          });
        }
      },
      index: {
        page: function(options) {
          // set page
          model.cursor().set('page', options.page);
          return promiseTransition("index", options).then(function() {
            return _loadRecords(options);
          });
        },
        show: function(options) {
          return promiseTransition("show", options);
        },
        new: function(options) {
          return promiseTransition("new", options);
        },
        create: function(options) {
          return promiseTransition("index", options);
        },
        edit: function(options) {
          return promiseTransition("edit", options);
        },
        update: function(options) {
          return promiseTransition("update", options);
        },
        delete: function(options) {
          return promiseTransition("delete", options);
        },
        destroy: function(options) {
          return promiseTransition("destroy", options);
        },
      },
      show: {
        _child: show_fsm,
        cancel: function(options) {
          return promiseTransition("index", options);
        },
        update: function(options) {
          // Preform update
          return promiseTransition("index", options);
        },
        destroy: function(options) {
          // Perform destroy
          return promiseTransition("index", options);
        }
      },
      new: {
        create: function(options) {
          // Perform create
          return promiseTransition("index", options);
        },
        cancel: function(options) {
          return promiseTransition("index", options);
        }
      },
      edit: {
        _child: edit_fsm,
        update: function(options) {
          // Perform destroy
          return promiseTransition("index", options);
        },
        cancel: function(options) {
          return promiseTransition("index", options);
        },
        destroy: function(options) {
          // Perform destroy
          return promiseTransition("index", options);
        }
      },
      delete: {
        destroy: function(options) {
          // Perform destroy
          return promiseTransition("index", options);
        },
        cancel: function(options) {
          return promiseTransition("index", options);
        }
      }
    },
    handleInit: function(options) {
      return this.handle('init', options);
    },
    handlePageClick: function(options) {
      return this.handle('page', options);
    },
    handleShow: function(options) {
      return this.handle('show', options);
    },
    handleCancel: function(options) {
      return this.handle("cancel", options);
    },
    handleEdit: function(options) {
      return this.handle("edit", options);
    },
    handleUpdate: function(options) {
      return this.handle("update", options);
    },
    handleDelete: function(options) {
      return this.handle("delete", options);
    },
    handleDestroy: function(options) {
      return this.handle("destroy", options);
    },
    handleNew: function(options) {
      return this.handle("new", options);
    },
    handleCreate: function(options) {
      return this.handle("create", options);
    },
  }); 

  var fsm = new PromiseStateMachine({
    initial: 'nothing',
    events: {
      init: { from: 'nothing', to: 'index' },
      page: { from: 'index', to: 'index' },
      show: {  from: 'index', to: 'form_show' },
      new: {  from: 'index', to: 'form_new' },
      create: {  from: 'form_new', to: 'index' },
      edit_index: {  from: 'index', to: 'form_edit_index' },
      edit_show: {  from: 'form_show', to: 'form_edit_show' },
      update_index: { from: 'form_edit_index', to: 'index' },
      update_show: { from: 'form_edit_show', to: 'form_show' },
      delete_index: { from: 'index', to: 'form_delete_index' },
      delete_show: { from: 'form_show', to: 'form_delete_show' },
      delete_show_edit: { from: 'form_show', to: 'form_delete_show' },
      delete_edit: { from: 'form_edit', to: 'form_delete_edit' },
      destroy: {  from: ['form_delete_index', 'form_delete_show', 'form_delete_edit'], to: 'index' },
      cancel_index: { from: ['form_new', 'form_edit_index', 'form_show', 'form_delete_index'], to: 'index' },
      cancel_show: { from: ['form_edit_show', 'form_delete_show'], to: 'form_show' },
      cancel_edit: { from: ['form_delete_edit'], to: 'form_edit' }
    }
  });
  
  fsm.enter('init', function(event, from, to, options) {
    return _loadRecords(options);
  });

  fsm.enter('page', function(event, from, to, options) {
    model.cursor().set('page', _.first(options).page);
    return _loadRecords(options);
  });
  
  fsm.enter('new', function(event, from, to, options) {
    return Promise.resolve();
  });

  fsm.enter('create', function(event, from, to, options) {
    return Promise.resolve();
  });
  
  fsm.enter('edit', function(event, from, to, options) {
    return Promise.resolve();
  });

  fsm.enter('update_index', function(event, from, to, options) {
    return Promise.resolve();
  });

  fsm.enter('update_show', function(event, from, to, options) {
    return Promise.resolve();
  });

  fsm.enter('delete_index', function(event, from, to, options) {
    return Promise.resolve();
  });
  
  fsm.enter('delete_show', function(event, from, to, options) {
    return Promise.resolve();
  });

  fsm.enter('delete_edit', function(event, from, to, options) {
    return Promise.resolve();
  });

  fsm.enter('destroy', function(event, from, to, options) {
    return Promise.resolve();
  });

  fsm.enter('cancel_index', function(event, from, to, options) {
    return Promise.resolve();
  });
  
  fsm.enter('cancel_show', function(event, from, to, options) {
    return Promise.resolve();
  });

  fsm.enter('cancel_edit', function(event, from, to, options) {
    return Promise.resolve();
  });

  fsm.all(function(event, from, to, options){
    console.log(to);
    model.cursor().set('state', to);
  });

  var handleEdit = function(options) {
    // Dependiendo del estado utilizar la transicion apropiada
    switch(fsm.state()) {
      case "index":
        return fsm.edit_index(options);
      case "form_show":
        return fsm.edit_show(options);
    };
  };
  
  var handleUpdate = function(options) {
    // Dependiendo del estado utilizar la transicion apropiada
    switch(fsm.state()) {
      case "form_edit_index":
        return fsm.update_index(options);
      case "form_edit_show":
        return fsm.update_show(options);
    };
  };

  var handleDelete = function(options) {
    // Dependiendo del estado utilizar la transicion apropiada
    switch(fsm.state()) {
      case "index":
        return fsm.delete_index(options);
      case "form_show":
        return fsm.delete_show(options);
      case "form_edit_index":
      case "form_edit_show":
        return fsm.delete_edit(options);
    };
  };

  var handleCancel = function(options) {
    // Dependiendo del estado utilizar la transicion apropiada
    switch(fsm.state()) {
      case 'form_new':
      case 'form_edit_index':
      case 'form_show':
      case 'form_delete_index':
        return fsm.cancel_index(options);
      case 'form_edit_show':
      case 'form_delete_show':
        return fsm.cancel_show(options);
      case "form_delete_edit":
        return fsm.cancel_edit(options);
    };
  };

  return {
    handleInit: _.bind(index_fsm.handleInit, index_fsm), // _.bind(fsm.init, fsm),
    handlePageClick: _.bind(index_fsm.handlePageClick, index_fsm), // _.bind(fsm.page, fsm),
    handleShow: _.bind(index_fsm.handleShow, index_fsm), // _.bind(fsm.show, fsm),
    handleNew: _.bind(index_fsm.handleNew, index_fsm),
    handleDelete: _.bind(index_fsm.handleDelete, index_fsm),
    handleCancel: _.bind(index_fsm.handleCancel, index_fsm),
    handleCreate: _.bind(index_fsm.handleCreate, index_fsm),
    handleEdit:  _.bind(index_fsm.handleEdit, index_fsm),
    handleUpdate: _.bind(index_fsm.handleUpdate, index_fsm),
    handleDestroy: _.bind(index_fsm.handleDestroy, index_fsm)
  };
};

/* AdminJS.modules.users.Controller = function(sb, model, module_options) {
  'use strict';

  var fsm = new PromiseStateMachine({
    initial: 'none',
    events: {
      init: { from: 'none', to: 'index' },
      page: { from: 'index', to: 'index' },
      filter: { from: 'index', to: 'index' }
    }
  });
  
  var el = module_options.el,
    params = module_options.params;
*/  
  /**
   * Promise que carga los registros en el modelo
   * options es un objeto con los siguientes datos:
   * *page*: página a cargar
   */
/*  var _loadRecords = function(options) {
    var page = (options.page || 1), 
      per_page = model.get('per_page'),
      query_string;
    
    model.set("loading_spinner", true);
    return sb.services.get(
      'users', 'index', {page: page, per_page: per_page}
    ).then(function(data) {
      // Calcular el numero de paginas
      model.set('page_count', parseInt(data.total/per_page,10)+1);
      model.set('records', data.data);
      model.set('page', page);
      model.set('total', data.total);
    }).finally(function() {
      model.set("loading_spinner", false);
    });
  };
  
  var initEvent = function(event, from, to, anyArgs) {
    var options = _.first(anyArgs);
    return sb.promises.reactRender(
        el,
        AdminJS.components.adminjs.Users, 
        options
    ).then(function() {
      // Inicializar el modelo
      model.initialize(params);
      return _loadRecords({
        page: model.get('page'),
        per_page: model.get('per_page')
      });
    });
  };
  
  var pageEvent = function(event, from, to, anyArgs) {
    var options = _.first(anyArgs);
    return _loadRecords(options);
  };

  fsm.on('init', _.bind(initEvent));
  fsm.on('page', _.bind(pageEvent));
  
  return AdminJS.lib.Controller(sb, fsm, model, {
    initialize: function(options) {
      // TODO: Hay que comprobar si llega un id
      return fsm.init({
        controller: this,
        model: model
      });
    },
    handlePageClick: function(options) {
      return fsm.page({
        controller: this,
        model: model,
        page: options.page
      });
    },
    handleToolbar: function(options) {
      console.log(options);
    }
  
  });
};
*/