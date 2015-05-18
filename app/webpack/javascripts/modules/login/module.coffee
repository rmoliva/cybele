React = require('react')
ReactLogin = require('../../components/login')

module.exports = (sb) ->
  'use strict'
  el = null
  fsm = null
  model = null
  controller = null

  initialize = (opts, done) ->
    el = opts.el
    
    debugger;
    
    sb.promises.reactRender(el, ReactLogin, null).then ->
      done()
    
    #fsm = StateMachine.create(
    #  events: [
    #    {
    #      name: 'do_register'
    #      from: [
    #        'none'
    #        'login'
    #      ]
    #      to: 'register'
    #    }
    #    {
    #      name: 'do_forgot_password'
    #      from: [
    #        'none'
    #        'login'
    #      ]
    #      to: 'forgot_password'
    #    }
    #    {
    #      name: 'do_login'
    #     from: [
    #        'none'
    #        'register'
    #        'forgot_password'
    #      ]
    #      to: 'login'
    #    }
    #  ]
    #  callbacks:
    #    onenterlogin: onEnterLogin
    #    onleavelogin: onLeaveLogin
    #    onenterforgot_password: onEnterForgotPassword
    #    onleaveforgot_password: onLeaveForgotPassword
    #    onenterregister: onEnterRegister
    #    onleaveregister: onLeaveRegister
    #  error: (eventName, from, to, args, errorCode, errorMessage) ->
    #    console.log 'event ' + eventName + ' was naughty :- ' + errorMessage
    #    return
    #)
    #model = AdminJS.modules.login.Model.create(sb)
    #controller = new (AdminJS.modules.login.Controller)(sb, fsm, model)
    #switch opts.state
    #  when 'forgot_password'
    #    fsm.do_forgot_password()
    #  when 'register'
    #    fsm.do_register()
    #  else
    #    fsm.do_login()
    done()
    return

  onEnterLogin = ->
    sb.promises.reactRender(el, AdminJS.components.adminjs.login.Login,
      controller: controller
      model: model).then (component) ->
      sb.hash.setSilently 'login'
      return
    return

  onLeaveLogin = ->
    $(el).empty()
    return

  onEnterRegister = ->
    sb.promises.reactRender(el, AdminJS.components.adminjs.login.Register,
      controller: controller
      model: model).then ->
      sb.hash.setSilently 'register'
      return
    return

  onLeaveRegister = ->
    $(el).empty()
    return

  onEnterForgotPassword = ->
    sb.promises.reactRender(el, AdminJS.components.adminjs.login.ForgotPassword,
      controller: controller
      model: model).then ->
      sb.hash.setSilently 'forgot_password'
      return
    return

  onLeaveForgotPassword = ->
    $(el).empty()
    return

  destroy = ->
    controller = null
    # Quitar la plantilla
    $(el).empty()
    return

  {
    init: initialize
    destroy: destroy
  }
