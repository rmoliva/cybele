
module.exports = (core, options) ->
  'use strict'

  _isModuleRunning = (module) ->
    _.findIndex(core.lsInstances(), (instance) ->
      instance == module
    ) >= 0

  moduleStart = (module, options) ->
    # Parar siempre el modulo antes, por si acaso
    moduleStop(module).then ->
      new Promise((resolve, error) ->
        core.start module, { options: options }, resolve
        return
    )

  moduleStop = (module) ->
    # Si el modulo no esta arrancado, no pararlo
    if _isModuleRunning(module)
      new Promise((resolve, error) ->
        core.stop module, ->
          resolve()
          return
        return
    )
    else
      Promise.resolve()

  timeout = (secs) ->
    new Promise((resolve, reject) ->
      setTimeout (->
        resolve()
        return
      ), secs * 1000
      return
    )

  reactRender = (element, component, props) ->
    new Promise((resolve, reject) ->
      react = React.createElement(component, props)
      React.render react, document.querySelector(element), ->
        resolve react
        return
    )


  ### Inicializar el plugin
  ###

  onPluginInit = (instanceSandbox, options) ->

  ### Liberar medios
  ###

  onPluginDestroy = ->

  # Extender el core
  _.extend core, { promises:
    moduleStart: moduleStart
    moduleStop: moduleStop
    timeout: timeout
    reactRender: reactRender
    }, this
  # Extender el sandbox
  _.extend core.Sandbox.prototype, { promises:
    moduleStart: moduleStart
    moduleStop: moduleStop
    timeout: timeout
    reactRender: reactRender
    }, this
  
  {
    init: onPluginInit
    destroy: onPluginDestroy
  }
