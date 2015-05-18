
module.exports = (sb) ->
  'use strict'
  subscriptions = message: null

  initialize = (opts, done) ->
    subscriptions.message = sb.on('notification.message', _.bind(onReceiveMessage))
    done()
    return

  onReceiveMessage = (event) ->
    console.log 'onReceiveMessage' + event.message
    noty
      text: event.message
      type: event.type
      layout: 'topCenter'
      timeout: '3000'
    return

  destroy = (done) ->
    done()
    return

  {
    init: initialize
    destroy: destroy
  }
