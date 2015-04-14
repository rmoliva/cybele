NS('AdminJS.modules.login');

AdminJS.modules.login.Model = function(sb) {
    'use strict';
    
    var signals = {
      setted: new Signal(),
    };
    
    var values = {
      spinner: false
    };

    var set = function(key, value) {
      var old = values[key];
      values[key] = value;
      signals.setted.dispatch({key: key, value: value, old: old});
    };
    
    return {
        on: signals,
        set: set
    };
};
