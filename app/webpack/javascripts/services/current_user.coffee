module.exports = (core, decoder) ->
  initialize = () ->
    #

  show = (options) ->
    core.services.getRequest('/current_user.json', options)

  {
    initialize: initialize
    show: show
  }
