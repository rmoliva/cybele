NS('AdminJS.modules.users');

AdminJS.modules.users.Controller = function(sb, model) {
  'use strict';

  var _loadRecords = function(options) {
    var page = (options.page || 1), 
      per_page = model.cursor().get('per_page'),
      query_string;
    
    model.cursor().set("loading_spinner", true);
    return sb.services.get(
      'users', 'index', {page: page, per_page: per_page}
    ).then(function(data) {
      // Calcular el numero de paginas
      model.cursor().set('page_count', parseInt(data.total/per_page,10)+1);
      model.cursor().set('records', data.data);
      model.cursor().set('page', page);
      model.cursor().set('total', data.total);
    }).finally(function() {
      model.cursor().set("loading_spinner", false);
    });
  };

  return {
    handleInit: function(options) {
      return _loadRecords(options);
    },
    handlePageClick: function(options) {
      return _loadRecords(options);
    },
    handleToolbar: function(options) {
      console.log(options);
    }
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