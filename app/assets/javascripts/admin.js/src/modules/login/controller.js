NS('AdminJS.modules.login');

AdminJS.modules.login.Controller = function(sb, model) {
  'use strict';

  return {
    handleInit: function(options) {
      return new Promise(function(resolve, reject) {
        // inicializar el modelo
        model.cursor().set("state", options.state);
        sb.hash.setSilently(options.state);
        resolve();
      });
    },
    
    handleLogin: function() {
      model.cursor().set("state", "login");
      sb.hash.setSilently("login");
    },
  
    handleSignIn: function(state) {
      model.cursor().set('spinner', true);
      
      // Hacer una llamada de login
      sb.session.login(state).then(function() {
        // Todo ha ido bien ir a la aplicacion central
        sb.hash.setHash("");
      }).catch(function() {
        model.cursor().set('spinner', false);
      });
    },
  
    handleForgotPassword: function() {
      model.cursor().set("state", "forgot_password");
      sb.hash.setSilently("forgot_password");
    },
  
    handleSendPassword: function(state) {
      console.log("handleSendPassword");
      console.log(state);
    },
  
    handleRegister: function() {
      model.cursor().set("state", "register");
      sb.hash.setSilently("register");
    },
    
    handleSendRegister: function(state) {
      console.log("handleSendRegister");
      console.log(state);
    }
  };
};