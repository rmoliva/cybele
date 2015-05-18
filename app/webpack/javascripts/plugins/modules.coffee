

module.exports = (core, options) ->
  'use strict'

  ### Inicializar el plugin
  ###

  onPluginInit = (instanceSandbox, options) ->

  startLayout = (options) ->
    core.promises.moduleStart('layout', _.merge({ el: core.conf.get('el') }, options)).then(->
      Promise.all [
        core.promises.moduleStart('notification', options)
        core.promises.moduleStart('topnav', _.merge({ el: '#topnav' }, options))
        core.promises.moduleStart('sidebar', _.merge({ el: '#sidebar' }, options))
      ]
    ).then ->
      core.promises.moduleStart 'simplify', options

  startLogin = (options) ->
    core.promises.moduleStart('login', _.merge({ el: '#application' }, options)).then(->
      core.promises.moduleStart 'notification', options
    ).then ->
      core.promises.moduleStart 'simplify', options

  stopAllModules = ->
    stop_promises = _.map(core.lsInstances(), (instance) ->
      core.promises.moduleStop instance
    )
    Promise.all stop_promises

  ### Liberar medios
  ###

  onPluginDestroy = ->

  # Extender el core
  _.extend core, { modules:
    startLayout: startLayout
    stopAllModules: stopAllModules
    startLogin: startLogin }, this
  # Extender el sandbox
  _.extend core.Sandbox.prototype, { modules:
    startLayout: startLayout
    stopAllModules: stopAllModules
    startLogin: startLogin }, this
  {
    init: onPluginInit
    destroy: onPluginDestroy
  }
