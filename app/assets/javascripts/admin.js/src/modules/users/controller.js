NS('AdminJS.modules.users');

AdminJS.modules.users.Controller = function(sb) {
  'use strict';

  var stateProperty = new Bacon.Bus();
  var pageProperty = new Bacon.Bus();
  var perPageProperty = Bacon.constant(20);
  
  var indexStream = stateProperty.filter(function(state) {
    return state === 'index';
  });

  var responseStream = pageProperty.flatMapLatest(function(page) {
    console.log("responseStream: "+page);
    
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

   var ockham_fsm = Ockham.create({
    config: function(fsm) {
      return {
        states: {
          none: {
            init: this.initTransition
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
                update: 'index'
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
    },
    initTransition: function(fsm, options) {
      return Promise.resolve("index", options);
    }
  });
  
  var handleTransition = function(transition) {
    return function(options) {
      pageProperty.push(options.page || 1);
      return ockham_fsm.doTransition(transition, options).then(function(ret) {
        stateProperty.push(ret.to);
      });
    };
  };
  
 var model = Bacon.combineTemplate({
    page: pageProperty, 
    per_page: perPageProperty,
    records: recordsProperty,
    total: totalProperty,
    page_count: pageCountProperty,
    state: stateProperty
  });  

  return {
    handleInit: handleTransition("init"),
    handlePageClick: handleTransition("page"),
    handleShow: handleTransition("show"),
    handleCancel: handleTransition("cancel"),
    handleNew: handleTransition("new"),
    handleDelete: handleTransition("delete"),
    handleCreate: handleTransition("create"),
    handleEdit: handleTransition("edit"),
    handleUpdate: handleTransition("update"),
    handleDestroy: handleTransition("destroy"),
    
    model: model
  };
};
