
plugins = require('./plugins/init')
services = require('./services/init')
session = require('./session')

module.exports = class App
  core: null
  plugins: null
  modules: null
  configuration: null
  router: null
  i18n: null
  services: null
  session: null
  start: ->
    # inicializar el scaleApp
    core = new scaleApp.Core()
    
    # Inicializar plugins
    @plugins = new plugins(core)
    @plugins.initialize()
    
    # Inicializar servicios
    @services = new services(core)
    @services.initialize()

    # Inicializar session
    @session = new session(core)

    # Inicializar el core
    core.boot()

    core.services.get('sessions','destroy').then ->
      @session.loadCurrentUser().then ->
        # Inicializar modulos
        # modules.initialize()
        
        # Incializar el router
        #router.initialize()
    
  destroy: ->
    # Liberar elementos