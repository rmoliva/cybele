NS('AdminJS.lib');

var Signal = signals.Signal;

AdminJS.lib.Model = {
  constructor: function(sb, initial_data) {
    var data = [];
    data.push(Immutable.fromJS(initial_data));
    var signals = {
      commited: new Signal()
    };
    var commit = function() {
      signals.commited.dispatch(getData());
    };
    var getData = function() {
      return _.last(data).toObject();
    };
    var setData = function() {
      debugger;
      data.push(_.last(data).set(arguments));
      return data;
    };
    var getDataObject = function() {
      return data;
    };
    return {
      on: signals,
      commit: commit,
      getData: getData,
      getDataObject: getDataObject,
      setData: setData 
    };
  },
  create: function(sb, initial_state) {
    'use strict';
    
    return new AdminJS.lib.Model.constructor(sb, initial_state);
  }
};
