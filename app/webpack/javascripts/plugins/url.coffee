
module.exports = (core, options) ->
  'use strict'

  _encodeObjects = (name, value, recursive) ->
    self = _encodeObjects
    objects = []
    i = undefined
    ln = undefined
    if _.isArray(value)
      i = 0
      ln = value.length
      while i < ln
        if recursive
          objects = objects.concat(self(name + '[' + i + ']', value[i], true))
        else
          objects.push
            name: name
            value: value[i]
        i++
    else if _.isObject(value)
      for i of value
        `i = i`
        if value.hasOwnProperty(i)
          if recursive
            objects = objects.concat(self(name + '[' + i + ']', value[i], true))
          else
            objects.push
              name: name
              value: value[i]
    else
      objects.push
        name: name
        value: value
    objects

  encodeHash = (object, recursive) ->
    paramObjects = []
    params = []
    i = undefined
    j = undefined
    ln = undefined
    paramObject = undefined
    value = undefined
    for i of object
      `i = i`
      if object.hasOwnProperty(i)
        paramObjects = paramObjects.concat(_encodeObjects(i, object[i], recursive))
    j = 0
    ln = paramObjects.length
    while j < ln
      paramObject = paramObjects[j]
      value = paramObject.value
      if _.isNumber(value)
        value = value.toString()
      else
        if _.isDate(value)
          value = new Date(value).toString()
        else
          if _.isEmpty(value)
            value = ''
      params.push encodeURIComponent(paramObject.name) + '=' + encodeURIComponent(String(value))
      j++
    params.join '&'

  ### Inicializar el plugin
  ###

  onPluginInit = (instanceSandbox, options) ->

  ### Liberar medios
  ###

  onPluginDestroy = ->

  # Extender el core
  _.extend core, { url: encodeHash: encodeHash }, this
  # Extender el sandbox
  _.extend core.Sandbox.prototype, { url: encodeHash: encodeHash }, this
  {
    init: onPluginInit
    destroy: onPluginDestroy
  }