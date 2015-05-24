NS('AdminJS.modules.login');

AdminJS.modules.login.Model = {
  constructor: function(sb, initial_data) {
    var data = Immutable.fromJS(initial_data);
    var signals = {
      commited: new Signal()
    };
    var commit = function() {
      signals.commited.dispatch(data.get());
    };
    var getData = function() {
      return data.toObject();
    };
    
    return {
      on: signals,
      commit: commit,
      getData: getData
    };
  },
  
  create: function(sb) {
    'use strict';
    
    return new AdminJS.modules.login.Model.constructor(sb, {spinner: false, state: 'login'});
  }
};
