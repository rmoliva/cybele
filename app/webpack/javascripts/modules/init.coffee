
layout = require('./layout/module')
notification = require('./notification/module')
login = require('./login/module')
simplify = require('./simplify/module')

module.exports = (core) ->
  'use strict'
  modules = 
    notification: notification

    layout: layout
    # topnav: AdminJS.modules.topnav.Module
    # sidebar: AdminJS.modules.sidebar.Module
    simplify: simplify
    login: login
    # users: AdminJS.modules.users.Module

  ###*
  # Registra todos los módulos de la aplicación Configurations en scaleApp
  ###

  initialize = ->
    # Registrar los modulos en el application
    _.each modules, (module, name) ->
      core.register name, module
      return
    return

  ###*
  # Parar los modulos y desregistrar todos
  ###

  destroy = ->
    running = core.lsInstances()
    _.each modules, (module, name) ->
      # Si el modulo esta arrancado, pararlo
      if _.contains(running, name)
        core.stop name
      return
    return

  {
    initialize: initialize
    destroy: destroy
  }
