NS('AdminJS.lib');

AdminJS.lib.Model = function(sb, values, hash_keys) {
    'use strict';
    
    var signals = {
      setted: new Signal(),
      hash_changed: new Signal()
    };
    
    var initialize = function(params) {
      _.each(params, function(value, key) {
        if(values[key]) {
          set(key, value);
        }
      }, this);
    };
    
    var set = function(key, value) {
      var old = values[key];
      values[key] = value;
      signals.setted.dispatch({key: key, value: value, old: old});
      
      // Si es una clave de hash notificarlo
      if(_.include(hash_keys, key)) {
        signals.hash_changed.dispatch(getHashParams());
      }
    };
    
    var get = function(key) {
      if(!values[key]) {
        console.log("Model: No key: "+key+"found. Only: "+Object.keys(values).join(', '));
        return;
      }
      return values[key];
    };
    
    var getValues = function() {
      return values;
    };
    
    var getHashParams = function() {
      var params = {};
      _.each(hash_keys, function(key) {
        params[key] = values[key];
      }, this);
      return params;
    };
    
    return {
      initialize: initialize,
      on: signals,
      set: set,
      get: get,
      getValues: getValues,
      getHashParams: getHashParams
    };
};
