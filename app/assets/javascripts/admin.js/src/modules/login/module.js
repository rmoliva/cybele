NS('AdminJS.modules.login');

AdminJS.modules.login.Module = function(sb) {
    'use strict';

    var el = null;
    var fsm = null;
    var react = null;
    var model = null;
    var controller = null;

    var initialize = function(opts, done) {
        el = opts.el;
        
        fsm = StateMachine.create({
          events: [
            { name: 'do_register', from: ['none','login'], to: 'register'},
            { name: 'do_forgot_password', from: ['none','login'], to: 'forgot_password'},
            { name: 'do_login', from: ['none', 'register', 'forgot_password'], to: 'login'}
          ],
          callbacks: {
            onenterlogin: onEnterLogin,
            onleavelogin: onLeaveLogin,
            onenterforgot_password: onEnterForgotPassword,
            onleaveforgot_password: onLeaveForgotPassword,
            onenterregister: onEnterRegister,
            onleaveregister: onLeaveRegister
          },
          error: function(eventName, from, to, args, errorCode, errorMessage) {
            console.log('event ' + eventName + ' was naughty :- ' + errorMessage);
          },
        });
        
        model = new AdminJS.modules.login.Model(sb);
        controller = new AdminJS.modules.login.Controller(sb, fsm, model);
        
        switch(opts.state) {
          case "forgot_password": {
            fsm.do_forgot_password();
            break;
          }
          case "register": {
            fsm.do_register();
            break;
          }
          default:
            fsm.do_login();
        }
        done();
    };
    
    var onEnterLogin = function() {
      sb.promises.reactRender(
          el,
          AdminJS.components.adminjs.login.Login, {
            controller: controller,
            model: model
          }
      ).then(function(component) {
        sb.hash.setSilently("login");
      });
    };

    var onLeaveLogin = function() {
      $(el).empty();
    };

    var onEnterRegister = function() {
      sb.promises.reactRender(
          el,
          AdminJS.components.adminjs.login.Register, {
            controller: controller,
            model: model
          }
      ).then(function() {
        sb.hash.setSilently("register");
      });
    };

    var onLeaveRegister = function() {
      $(el).empty();
    };
    
    var onEnterForgotPassword = function() {
      sb.promises.reactRender(
          el,
          AdminJS.components.adminjs.login.ForgotPassword, {
            controller: controller,
            model: model
          }
      ).then(function() {
        sb.hash.setSilently("forgot_password");
      });
    };

    var onLeaveForgotPassword = function() {
      $(el).empty();
    };

    var destroy = function() {
      controller = null;
      
      // Quitar la plantilla
      $(el).empty();
    };

    return {
        init: initialize,
        destroy: destroy
    };
};
