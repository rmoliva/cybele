NS('AdminJS.modules.login');

AdminJS.modules.login.Controller = function(sb, fsm) {
    'use strict';

    var handleLogin = function() {
      fsm.do_login();
    };
  
    var handleSignIn = function(state) {
      console.log("handleSignIn");
      console.log(state);
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
