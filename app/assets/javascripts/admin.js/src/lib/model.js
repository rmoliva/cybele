NS('AdminJS.lib');

var Signal = signals.Signal;

AdminJS.lib.Model = {
  sb: null,
  values: {},
  hash_keys: [],
  signals: {
    setted: new Signal(),
    hash_changed: new Signal()
  },
  initialize: function(params) {
    _.each(params, function(value, key) {
    if(this.values[key]) {
      this.set(key, value);
    }
    }, this);
  },
  set: function(key, value) {
    var old = this.values[key];
    this.values[key] = value;
    this.signals.setted.dispatch({key: key, value: value, old: old});
    
    // Si es una clave de hash notificarlo
    if(_.include(this.hash_keys, key)) {
      this.signals.hash_changed.dispatch(this.getHashParams());
    }
  },
  get: function(key) {
    if(!this.values[key]) {
      console.log("Model: No key: "+key+"found. Only: "+Object.keys(this.values).join(', '));
      return;
    }
    return this.values[key];
  },
  
  getValues: function() {
    return this.values;
  },
  
  getHashParams: function() {
    var params = {};
    _.each(this.hash_keys, function(key) {
      params[key] = this.values[key];
    }, this);
    return params;
  },
  
  create: function(configuration) {
    return _.assign(
      Object.create(AdminJS.lib.Model), 
      _.merge(configuration, {
        on: this.signals
      })
    );
  }
};
