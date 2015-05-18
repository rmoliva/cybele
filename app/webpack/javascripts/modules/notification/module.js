
module.exports = function(sb) {
    'use strict';

    var subscriptions = {
      message: null
    };
    
    var initialize = function(opts, done) {
      subscriptions.message = sb.on('notification.message', _.bind(onReceiveMessage));
      done();
    };

    var onReceiveMessage = function(event) {
      console.log("onReceiveMessage"+event.message);
      
      noty({
        text: event.message,
        type: event.type,
        layout: 'topCenter',
        timeout: '3000'
      });      
    };
    
    var destroy = function(done) {
      done();
    };

    return {
        init: initialize,
        destroy: destroy
    };
};
