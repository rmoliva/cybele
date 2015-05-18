module.exports = (core, _doRequest) ->
  initialize = () ->
    #

  show = (options) ->
    _doRequest('GET','/current_user.json', options)

  {
    initialize: initialize
    show: show
  }
