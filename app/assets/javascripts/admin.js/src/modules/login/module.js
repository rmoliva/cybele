NS('AdminJS.modules.login');

AdminJS.modules.login.Module = function(sb) {
    'use strict';

    var el = null;
    
    var fsm = null;

    var initialize = function(opts, done) {
        el = opts.el;
        
        fsm = StateMachine.create({
          events: [
            { name: 'do_register', from: 'signin', to: 'register'},
            { name: 'do_forgot_password', from: 'signin', to: 'forgot_password'},
            { name: 'do_signin', from: ['none', 'register', 'forgot_password'], to: 'signin'}
          ],
          callbacks: {
            onentersignin: onEnterSignin,
            onleavesignin: onLeaveSignin,
            onenterforgot_password: onEnterForgotPassword,
            onleaveforgot_password: onLeaveForgotPassword,
            onenterregister: onEnterRegister,
            onleaveregister: onLeaveRegister,
            onafterdo_signin: function() {
              fsm.onafterdo_signin = null;
              done();
            }
          },
          error: function(eventName, from, to, args, errorCode, errorMessage) {
            console.log('event ' + eventName + ' was naughty :- ' + errorMessage);
          },
        });
        fsm.do_signin();
    };
    
    var onEnterSignin = function() {
      sb.promises.reactRender(
          el,
          AdminJS.components.adminjs.login.Login, null
      ).then(function() {
      });
    };

    var onLeaveSignin = function() {
      $el.empty();
    };

    var onEnterRegister = function() {
      React.render(
          React.createElement(AdminJS.components.adminjs.login.Register, null),
          document.querySelector(el)
      );
    };

    var onLeaveRegister = function() {
      $el.empty();
    };
    
    var onEnterForgotPassword = function() {
      React.render(
          React.createElement(AdminJS.components.adminjs.login.ForgotPasword, null),
          document.querySelector(el)
      );
    };

    var onLeaveForgotPassword = function() {
      $el.empty();
    };

    var destroy = function() {
        // Quitar la plantilla
        $el.empty();
    };

    return {
        init: initialize,
        destroy: destroy
    };
};
