NS("AdminJS");

AdminJS.Session = function(core) {
    "use strict";
    
    var current_user = null;
    
    var initialize = function() {
    };

    var destroy = function() {
    };
    
    var login = function(record) {
      // Hacer una llamada de login
      return core.services.get(
        'sessions', 'create', {record: record}
      ).then(function(data) {
        current_user = data.data.user;
      });
    };

    var logout = function() {
      return core.services.get('sessions', 'destroy').then(function() {
        current_user = null;
      });
    };

    var getCurrentUser = function() {
      return current_user;
    };
    
    var getCurrentUserCompleteName = function () {
      if(current_user) {
        return current_user.surname+", "+current_user.name;
      }
      return null;
    }

    var _setCurrentUser = function(data) {
      current_user = data;
    };
    
    var loadCurrentUser = function() {
      return core.services.get('current_user','show').then(function(data) {
        _setCurrentUser(data.data);
      });
    };

    var isAuthenticated = function() {
      return !_.isNull(current_user);
    };
    
    // Extender el core
    _.extend(core, {
        session: {
          getCurrentUser: getCurrentUser,
          getCurrentUserCompleteName: getCurrentUserCompleteName,
          isAuthenticated: isAuthenticated,
          login: login,
          logout: logout
        }
    }, this);

    // Extender el sandbox
    _.extend(core.Sandbox.prototype, {
      session: {
        getCurrentUser: getCurrentUser,
        getCurrentUserCompleteName: getCurrentUserCompleteName,
        isAuthenticated: isAuthenticated,
        login: login,
        logout: logout
      }
    }, this);
    
    return {
        initialize: initialize,
        destroy: destroy,
        loadCurrentUser: loadCurrentUser
    };
};
