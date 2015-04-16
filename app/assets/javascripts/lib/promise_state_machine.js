'use strict';

var StateTransitionError = function(message) {
  this.name = 'StateTransitionError';
  this.message = message;
  this.stack = (new Error()).stack;
};

StateTransitionError.prototype = new Error();

var PromiseStateMachine = function(options) {
  this._state = options.initial;
  this._events = options.events;
  this._eventEmitter = new EventEmitter2();

  _.each(this._events, function(transitions, event) {
    if(!_.isArray(transitions.from)) {
      transitions.from = [transitions.from];
    }

    this[event] = this._buildEvent(event, transitions);
  }, this);
};

_.extend(PromiseStateMachine, {
  Promise: Promise
});

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

  on: function(event, handler) {
    this._eventEmitter.on(event, handler);
  },

  _buildEvent: function(event, transitions) {
    return function() {
      var from = this.state();
      var to = transitions.to;

      if(!this.can(event)) {
        return PromiseStateMachine.Promise.reject(
          new StateTransitionError(
            'Cannot transition from ' + from + ' via ' + event
          )
        );
      }

      var args = Array.prototype.slice.call(arguments);

      var handlers = this._eventEmitter.listeners(event);
      var promises = _.map(handlers, function(handler) {
        return handler.apply(null, [event, from, to, args]);
      });

      return PromiseStateMachine.Promise.all(promises).then(function(results) {
        this._state = to;
        return results;
      }.bind(this));
    };
  }
});
