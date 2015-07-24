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
  
   var ockham_fsm = Ockham.create({
    config: function(fsm) {
      return {
        states: {
          none: {
            init: this.initTransition
          },
          index: {
            page: this.pageTransition,
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
      return _loadRecords(options).then(function() {
        return Promise.resolve("index", options);
      });
    },
    pageTransition: function(fsm, options) {
      model.cursor().set('page', options.page);
      return _loadRecords(options).then(function() {
        return Promise.resolve("index", options);
      });
    }
  });
  
  var handleTransition = function(transition) {
    return function(options) {
      return ockham_fsm.doTransition(transition, options).then(function(ret) {
        model.cursor().set('state', ret.to);
      });
    };
  };

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
    handleDestroy: handleTransition("destroy")
  };
};
