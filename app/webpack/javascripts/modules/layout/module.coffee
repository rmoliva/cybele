
React = require('react')
ReactLayout = require('../../components/layout')

module.exports = (sb) ->
  'use strict'
  $el = null

  initialize = (opts, done) ->
    $el = $(opts.el)
    
    sb.promises.reactRender(opts.el, ReactLayout, null).then ->
      done()

  destroy = ->
    # Quitar la plantilla
    $el.empty()
    return

  {
    init: initialize
    destroy: destroy
  }