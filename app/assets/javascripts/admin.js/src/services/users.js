NS('CommonJS.services');

AdminJS.services.Users = function(core) {
  
  var initialize = function(decoder) {
    amplify.request.define("indexUsers", "ajax", {
      url: "/users.json",
      type: "GET",
      decoder: decoder
    });
    amplify.request.define("showUsers", "ajax", {
      url: "/users/{id}.json",
      type: "GET",
      decoder: decoder
    });
    amplify.request.define("createUsers", "ajax", {
      url: "/users",
      type: "POST",
      decoder: decoder
    });
    amplify.request.define("createUsers", "ajax", {
      url: "/users/{id}.json",
      type: "PUT",
      decoder: decoder
    });
    amplify.request.define("destroyUsers", "ajax", {
      url: "/users/{id}.json",
      type: "DELETE",
      decoder: decoder
    });
  };
  
  var index = function(options) {
    return core.promises.promiseRequest("indexUsers", options);
  };
  
  var show = function(options) {
    return core.promises.promiseRequest("showUsers", options);
  };

  var create = function(options) {
    return core.promises.promiseRequest("createUsers", options);
  };

  var update = function(options) {
    return core.promises.promiseRequest("updateUsers", options);
  };
  
  var destroy = function(options) {
    return core.promises.promiseRequest("destroyUsers", options);
  };
  
  return {
    initialize: initialize,
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy
  };
};
