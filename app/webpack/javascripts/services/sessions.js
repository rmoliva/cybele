
module.exports = function(core, _doRequest) {
  var initialize = function() {};
  var create = function(options) {
    return _doRequest('POST', '/sessions.json', options);
  };
  var destroy = function(options) {
    return _doRequest('DELETE', '/sessions/destroy.json', options);
  };
  return {
    initialize: initialize,
    create: create,
    destroy: destroy
  };
};