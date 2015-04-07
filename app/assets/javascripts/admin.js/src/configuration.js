NS("AdminJS");

AdminJS.Configuration = function(core, opts) {
    "use strict";
    
    var default_opts = {
      el: null, // Elemento sobre el que renderizar la aplicacion
      locale: null // Idioma del interfaz
    };
    
    var options = _.defaults(_.clone(opts), default_opts);

    /** 
     * Inicializa la aplicacion
     */
    var initialize = function() {
    };

    var destroy = function() {
    };

    var get = function(key) {
      return options[key];
    };

    var set = function(key, value) {
      // TODO
    };
    
    // Extender el core
    _.extend(core, {
        conf: {
            set: set,
            get: get
        }
    }, this);

    // Extender el sandbox
    _.extend(core.Sandbox.prototype, {
      conf: {
        set: set,
        get: get
      }
    }, this);
    
    return {
        initialize: initialize,
        destroy: destroy,
        get: get
    };
};
