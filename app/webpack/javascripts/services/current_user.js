
module.exports = function(core, _doRequest) {
  var initialize = function() {};
  var show = function(options) {
    return _doRequest('GET', '/current_user.json', options);
  };
  return {
    initialize: initialize,
    show: show
  };
};