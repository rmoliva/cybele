NS('AdminJS.modules.login');

AdminJS.modules.login.Controller = function(sb, fsm, model) {
  'use strict';

  return AdminJS.lib.Controller(sb, fsm, model, {
    handleLogin: function() {
      fsm.do_login();
    },
  
    handleSignIn: function(state) {
      model.set('spinner', true);
      
      // Hacer una llamada de login
      sb.session.login(state).then(function() {
        // Todo ha ido bien ir a la aplicacion central
        sb.hash.setHash("");
      }).catch(function() {
        model.set('spinner', false);
      });
    },
  
    handleForgotPassword: function() {
      fsm.do_forgot_password();
    },
  
    handleSendPassword: function(state) {
      console.log("handleSendPassword");
      console.log(state);
    },
  
    handleRegister: function() {
      fsm.do_register();
    },
    
    handleSendRegister: function(state) {
      console.log("handleSendRegister");
      console.log(state);
    }
  });
};