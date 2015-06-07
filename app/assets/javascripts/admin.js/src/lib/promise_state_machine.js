'use strict';

var PromiseStateMachine = function(options) {
  this._state = options.initial;
  this._events = options.events;
  this._eventEmitter = {
    enter: new EventEmitter2(),
    all: new EventEmitter2()
  };

  _.each(this._events, function(transitions, event) {
    if(!_.isArray(transitions.from)) {
      transitions.from = [transitions.from];
    }

    this[event] = this._buildEvent(event, transitions);
  }, this);
};

_.extend(PromiseStateMachine.prototype, {
  is: function(otherState) {
    return this.state() === otherState;
  },

  can: function(event) {
    return _.contains(this._events[event].from, this.state());
  },

  state: function() {
    return this._state;
  },

  enter: function(event, handler) {
    this._eventEmitter.enter.addListener(event, handler);
  },

  all: function(handler) {
    this._eventEmitter.all.addListener('all', handler);
  },

  _buildEvent: function(event, transitions) {
    return function() {
      var from = this.state();
      var to = transitions.to;

      if(!this.can(event)) {
        console.log("PSM ERROR: 'Cannot transition from '" + from + "' via '" + event);
        return Promise.reject(
          new StateTransitionError(
            'Cannot transition from ' + from + ' via ' + event
          )
        );
      }

      var args = Array.prototype.slice.call(arguments);

      // LLamar a los eventos de entrar en un estado
      var handlers = this._eventEmitter.enter.listeners(event);
      
      // Llamar a los eventos comunes
      handlers = handlers.concat(this._eventEmitter.all.listeners('all'));
      
      var promises = _.map(handlers, function(handler) {
        return handler.apply(null, [event, from, to, args]);
      });

      return Promise.all(promises).then(function(results) {
        this._state = to;
        return results;
      }.bind(this));
    };
  }
});
