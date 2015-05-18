module.exports = (core,_doRequest) ->

  initialize = () ->
    #

  create = (options) ->
    _doRequest('POST','/sessions.json', options)

  destroy = (options) ->
    _doRequest('DELETE', '/sessions.json', options)

  {
    initialize: initialize
    create: create
    destroy: destroy
  }
