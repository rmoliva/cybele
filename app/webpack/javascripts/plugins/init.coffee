
scaleAppLs = require('../lib/scaleApp.ls')
modules = require('./modules')
promises = require('./promises')
url = require('./url')

module.exports = (core) ->
  'use strict'

  initialize = ->
    core.use scaleAppLs
    core.use modules
    core.use promises
    core.use url

  { initialize: initialize }
