NS('AdminJS.services');

AdminJS.services.CurrentUser = function(core) {
  var initialize = function(decoder) {
    amplify.request.define("showCurrentUser", "ajax", {
      url: "/current_user.json",
      type: "GET",
      decoder: decoder
    });
  };
  
  var show = function(options) {
    return core.promises.promiseRequest("showCurrentUser", options);
  };
  
  var destroy = function() {
    // TODO
  };
  
  return {
    initialize: initialize,
    destroy: destroy,
    show: show,
    console: function() {
      return new Promise(function(resolve, reject) {
        console.log("Llamada a console");
        resolve();
      });
    }
  };
};
