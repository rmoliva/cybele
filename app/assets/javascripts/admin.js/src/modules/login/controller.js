NS('AdminJS.modules.login');

AdminJS.modules.login.Controller = function(sb, fsm, model) {
    'use strict';
    
    var handleLogin = function() {
      fsm.do_login();
    };
  
    var handleSignIn = function(state) {
      model.set('spinner', true);
      
      // Hacer una llamada de login
      sb.services.get('sessions', 'create', {record: state}).then(function(data) {
        // Todo ha ido bien ir a la aplicacion central
        sb.hash.setHash("");
      }).catch(function() {
        model.set('spinner', false);
      });
    };

    var handleForgotPassword = function() {
      fsm.do_forgot_password();
    };

    var handleSendPassword = function(state) {
      console.log("handleSendPassword");
      console.log(state);
    };

    var handleRegister = function() {
      fsm.do_register();
    };
    
    var handleSendRegister = function(state) {
      console.log("handleSendRegister");
      console.log(state);
    };

    return {
        handleLogin: handleLogin,
        handleSignIn: handleSignIn,
        handleRegister: handleRegister,
        handleSendRegister: handleSendRegister,
        handleForgotPassword: handleForgotPassword,
        handleSendPassword: handleSendPassword
    };
};
