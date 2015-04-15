NS('AdminJS.lib');

AdminJS.lib.Model = function(sb, values) {
    'use strict';
    
    var signals = {
      setted: new Signal(),
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
