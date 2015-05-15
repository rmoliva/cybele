
module.exports = (core) ->
  'use strict'
  current_user = null

  initialize = ->

  destroy = ->

  login = (record) ->
    # Hacer una llamada de login
    core.services.get('sessions', 'create', record: record).then (data) ->
      current_user = data.data.user

  logout = ->
    core.services.get('sessions', 'destroy').then ->
      current_user = null

  getCurrentUser = ->
    current_user

  getCurrentUserCompleteName = ->
    if current_user
      return current_user.surname + ', ' + current_user.name
    null

  _setCurrentUser = (data) ->
    current_user = data
    return

  loadCurrentUser = ->
    core.services.get('current_user', 'show').then (data) ->
      _setCurrentUser data.data
      return

  isAuthenticated = ->
    !_.isNull(current_user)

  # Extender el core
  _.extend core, { session:
    getCurrentUser: getCurrentUser
    getCurrentUserCompleteName: getCurrentUserCompleteName
    isAuthenticated: isAuthenticated
    login: login
    logout: logout }, this
  # Extender el sandbox
  _.extend core.Sandbox.prototype, { session:
    getCurrentUser: getCurrentUser
    getCurrentUserCompleteName: getCurrentUserCompleteName
    isAuthenticated: isAuthenticated
    login: login
    logout: logout }, this
  {
    initialize: initialize
    destroy: destroy
    loadCurrentUser: loadCurrentUser
  }
