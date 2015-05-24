
signals = require('signals');
immutable = require('immutable');

module.exports = {
  data: null,
  
  signals: {
    commited: new signals.Signal()
  },
  
  commit: function() {
    this.signals.commited.dispatch(this);
  },
  
  getState: function() {
    return this.data.get();
  },

  create: function(sb) {
    'use strict';
    
    this.data = immutable.fromJS({
      spinner: false,
      state: login
    });
    
    return {
      getState: this.getState,
      commit: this.commit,
      on: this.signals
    };
  }
};
