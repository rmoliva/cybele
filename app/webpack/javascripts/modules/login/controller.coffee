NS('AdminJS.modules.login');

module.exports = (sb, fsm, model) ->
  'use strict'
  AdminJS.lib.Controller sb, fsm, model,
    handleLogin: ->
      fsm.do_login()
      return
    handleSignIn: (state) ->
      model.set 'spinner', true
      # Hacer una llamada de login
      sb.session.login(state).then(->
        # Todo ha ido bien ir a la aplicacion central
        sb.hash.setHash ''
        return
      ).catch ->
        model.set 'spinner', false
        return
      return
    handleForgotPassword: ->
      fsm.do_forgot_password()
      return
    handleSendPassword: (state) ->
      console.log 'handleSendPassword'
      console.log state
      return
    handleRegister: ->
      fsm.do_register()
      return
    handleSendRegister: (state) ->
      console.log 'handleSendRegister'
      console.log state
      return
