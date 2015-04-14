NS('AdminJS.services');

AdminJS.services.Sessions = function(core) {
  var initialize = function(decoder) {
    amplify.request.define("createSession", "ajax", {
      url: "/sessions.json",
      type: "POST",
      decoder: decoder
    });
    amplify.request.define("destroySession", "ajax", {
      url: "/sessions.json",
      type: "DELETE",
      decoder: decoder
    });
  };
  
  var create = function(options) {
    return core.promises.promiseRequest("createSession", options);
  };
  
  var destroy = function(options) {
    return core.promises.promiseRequest("destroySession", options);
  };
  
  return {
    initialize: initialize,
    create: create,
    destroy: destroy
  };
};
