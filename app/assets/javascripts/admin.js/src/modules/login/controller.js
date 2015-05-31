NS('AdminJS.modules.login');

AdminJS.modules.login.Controller = function(sb, model) {
  'use strict';

   var fsm = StateMachine.create({
    events: [
      { name: 'do_register', from: ['none','login'], to: 'register'},
      { name: 'do_forgot_password', from: ['none','login'], to: 'forgot_password'},
      { name: 'do_login', from: ['none', 'register', 'forgot_password'], to: 'login'}
    ],
    callbacks: {
    },
    error: function(eventName, from, to, args, errorCode, errorMessage) {
      console.log('event ' + eventName + ' was naughty :- ' + errorMessage);
    },
  });

  return {
    handleInit: function(options) {
      // inicializar el modelo
      model.setData("state", options.state);
      model.commit();
      sb.hash.setSilently(options.state);
    },
    
    handleLogin: function() {
      model.setData("state", "login");
      fsm.do_login();
      model.commit();
      sb.hash.setSilently("login");
    },
  
    handleSignIn: function(state) {
      model.setData('spinner', true);
      
      // Hacer una llamada de login
      sb.session.login(state).then(function() {
        // Todo ha ido bien ir a la aplicacion central
        sb.hash.setHash("");
      }).catch(function() {
        model.setData('spinner', false);
      });
    },
  
    handleForgotPassword: function() {
      debugger;
      
      model.setData("state", "forgot_password");
      fsm.do_forgot_password();
      model.commit();
      sb.hash.setSilently("forgot_password");
    },
  
    handleSendPassword: function(state) {
      console.log("handleSendPassword");
      console.log(state);
    },
  
    handleRegister: function() {
      model.setData("state", "register");
      fsm.do_register();
      model.commit();
      sb.hash.setSilently("register");
    },
    
    handleSendRegister: function(state) {
      console.log("handleSendRegister");
      console.log(state);
    }
  };
};