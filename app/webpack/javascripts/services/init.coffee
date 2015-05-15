
request = require('superagent/lib/client')
current_user = require('./current_user')
users = require('./users')
sessions = require('./sessions')

module.exports = (core) ->
  'use strict'

  getRequest = (url, options) ->
    new Promise((resolve,error) ->
      debugger;
    
      return request.get(
        '/current_user.json'
      ).query(
        options
      ).end(
        resolve)
    ).then((err, request) -> 
      debugger;
    

      console.log(err);
      console.log(request);
    
    )

  ###*
  # Trata los valores devueltos por los reiqests
  # @data <Object> Datos devueltos por el request
  # @status <String> Indica si el resultado del request ha sido satisfactorio o no
  # @xhr
  # @success <Function> Función a ejecutar cuando se produce success en el request
  # @error <Function> Función a ejecutar cuando se produce un error en el request
  ###

  _decoder = (data, status, xhr, success, errorfn) ->
    if status == 'success'
      if data.success
        success data, status
      else
        _notifyError data.message, data, errorfn
    else if status == 'fail' or status == 'error'
      if xhr.status == 401
        console.log 'Unauthorized'
        core.emit 'services.unauthorized', data
        # Hemos notificado convenientemente... lo tratamos como algo normal 
        success { data: null }, status
      else
        _notifyError xhr.responseText, {}, errorfn
    return

  _notifyError = (message, data, errorfn) ->
    core.emit 'notification.message',
      message: message
      data: data
      type: 'error'
    errorfn message, data
    return

  services = 
    current_user: new current_user(core,_decoder)
    sessions: new sessions(core,_decoder)
    users: new users(core,_decoder)

  initialize = ->
    _.each services, ((service) ->
      service.initialize()
      return
    ), this
    return

  destroy = ->
    _.each services, ((service) ->
      service.destroy()
      return
    ), this
    return

  get = (service, action, options, scope) ->
    `var action`
    action = _getAction(service, action)
    options = options or {}
    if action
      return _.bind(action, scope or this)(options)
    return

  _getAction = (service, action) ->
    srv = services[service]
    if !srv
      console.log 'No service found: ' + service + '. Only services: ' + Object.keys(services).join(',')
      return
    if !srv[action]
      console.log 'No action found: ' + action + ' in service: ' + service
      return
    srv[action]

  authToken = ->
    $('meta[name="csrf-token"]').attr 'content'

  # Extender el core
  _.extend core, {
    services: 
      get: get
      getRequest: getRequest 
  }, this
  # Extender el sandbox
  _.extend core.Sandbox.prototype, {     
    services: 
      get: get
      getRequest: getRequest 
  }, this
  
  {
    initialize: initialize
    destroy: destroy
  }
