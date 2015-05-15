module.exports = (core, decoder) ->

  initialize = () ->
    #

  index = (options) ->
    new Promise((resolve,error) ->
      request.get(
        '/users.json'
      ).query(
        options
      ).end(
        resolve(decoder)
      )
    )

  show = (options) ->
    new Promise((resolve,error) ->
      request.get(
        '/users.json'
      ).query(
        options
      ).end(
        resolve(decoder)
      )
    )

  create = (options) ->
    new Promise((resolve,error) ->
      request.post(
        '/users.json'
      ).query(
        options
      ).end(
        resolve(decoder)
      )
    )

  update = (options) ->
    new Promise((resolve,error) ->
      request.put(
        '/users.json'
      ).query(
        options
      ).end(
        resolve(decoder)
      )
    )

  destroy = (options) ->
    new Promise((resolve,error) ->
      request.del(
        '/users.json'
      ).query(
        options
      ).end(
        resolve(decoder)
      )
    )

  {
    initialize: initialize
    index: index
    show: show
    create: create
    update: update
    destroy: destroy
  }
