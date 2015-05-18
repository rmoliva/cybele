
request = require('superagent/lib/client')
current_user = require('./current_user')
users = require('./users')
sessions = require('./sessions')

module.exports = function(core) {
  'use strict';

    var _doRequest = function(method, url, options) {
      return new Promise(function(resolve, reject) {
        return request(method, url).query(options).end(function(err, response) {
          var data;
          if (err && err.status === 401) {
            console.log("Unauthorized");
            core.emit("services.unauthorized");
            return resolve({});
          }
          if (err) {
            core.emit('notification.message', {
              message: err,
              data: err,
              type: 'error'
            });
            return;
          }
          data = JSON.parse(response.text);
          if (data.success) {
            return resolve(data.data);
          } else {
            return reject(data.message);
          }
        });
      });
    };

    var services = {
      current_user: new current_user(core,_doRequest),
      sessions: new sessions(core,_doRequest),
      users: new users(core,_doRequest)
    };
    
    var initialize = function() {
      _.each(services, function(service) {
        service.initialize();
      }, this);
    };

    var destroy = function() {
      _.each(services, function(service) {
        service.destroy();
      }, this);
    };
    
    var get = function(service, action, options, scope) {
      var action = _getAction(service, action);
      
      options = options || {};
      options = _.merge(options, {app: 'central'});

      if(action) {
        return _.bind(action, scope || this)(options);
      }
    };
    
    var _getAction = function(service, action) {
      var srv = services[service];
      
      if(!srv) {
        console.log("No service found: "+service+". Only services: "+Object.keys(services).join(','));
        return;
      }
      
      if(!srv[action]) {
        console.log("No action found: "+action+" in service: "+service);
        return;
      }
      return srv[action]
    };
    
    
    var authToken = function() {
      return $('meta[name="csrf-token"]').attr('content');
    };
    
    // Extender el core
    _.extend(core, {
        services: {
            get: get
        }
    }, this);

    // Extender el sandbox
    _.extend(core.Sandbox.prototype, {
      services: {
        get: get
      }
    }, this);

    return {
        initialize: initialize,
        destroy: destroy
    };
};


