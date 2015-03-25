NS('CommonJS.services');

CommonJS.services.Users = function(sb) {
  
  var initialize = function() {
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
    amplify.request.define("destroyusers", "ajax", {
      url: "/users/{id}.json",
      type: "DELETE",
      decoder: decoder
    });
  };
  
  var index = function(options) {
    return sb.promises.promiseRequest("indexCountries", options);
  };
  
  var show = function(options) {
    return sb.promises.promiseRequest("showCountries", options);
  };

  var create = function(options) {
    return sb.promises.promiseRequest("createCountries", options);
  };

  var update = function(options) {
    return sb.promises.promiseRequest("updateCountries", options);
  };
  
  var destroy = function(options) {
    return sb.promises.promiseRequest("destroyCountries", options);
  };
  
  
  var destroy = function() {
    // TODO
  };

  /**
   * Trata los valores devueltos por los reiqests
   * @data <Object> Datos devueltos por el request
   * @status <String> Indica si el resultado del request ha sido satisfactorio o no
   * @xhr
   * @success <Function> Función a ejecutar cuando se produce success en el request
   * @error <Function> Función a ejecutar cuando se produce un error en el request
   */
  var decoder = function(data, status, xhr, success, error) {
    if (status === "success") {
      success(data, status);
    } else if (status === "fail" || status === "error") {
      error(xhr.responseText, status);
    }
  };
  
  return {
    initialize: initialize,
    destroy: destroy,
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy
  };
};
