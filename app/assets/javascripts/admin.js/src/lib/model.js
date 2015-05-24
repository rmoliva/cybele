NS('AdminJS.lib');

var Signal = signals.Signal;

AdminJS.lib.Model = {
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
  create: function(sb, initial_state) {
    'use strict';
    
    return new AdminJS.lib.Model.constructor(sb, initial_state);
  }
};
