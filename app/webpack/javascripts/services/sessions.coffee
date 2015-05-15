module.exports = (core,decoder) ->

  initialize = () ->
    #

  create = (options) ->
    new Promise((resolve,error) ->
      request.post(
        '/sessions.json'
      ).query(
        options
      ).end(
        resolve(decoder)
      )
    )

  destroy = (options) ->
    new Promise((resolve,error) ->
      request.del(
        '/sessions.json'
      ).query(
        options
      ).end(
        resolve(decoder)
      )
    )

  {
    initialize: initialize
    create: create
    destroy: destroy
  }
