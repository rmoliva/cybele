NS('AdminJS.plugins');

AdminJS.plugins.Url = function(core, options) {
    'use strict';
    
    var _encodeObjects = function(name, value, recursive) {
      var self = _encodeObjects,
          objects = [],
          i, ln;

      if (_.isArray(value)) {
          for (i = 0, ln = value.length; i < ln; i++) {
              if (recursive) {
                  objects = objects.concat(self(name + '[' + i + ']', value[i], true));
              }
              else {
                  objects.push({
                      name: name,
                      value: value[i]
                  });
              }
          }
      }
      else if (_.isObject(value)) {
          for (i in value) {
              if (value.hasOwnProperty(i)) {
                  if (recursive) {
                      objects = objects.concat(self(name + '[' + i + ']', value[i], true));
                  }
                  else {
                      objects.push({
                          name: name,
                          value: value[i]
                      });
                  }
              }
          }
      }
      else {
          objects.push({
              name: name,
              value: value
          });
      }

      return objects;
  };

    var encodeHash = function(object, recursive) {
      var paramObjects = [],
      params = [],
      i, j, ln, paramObject, value;

      for (i in object) {
          if (object.hasOwnProperty(i)) {
              paramObjects = paramObjects.concat(_encodeObjects(i, object[i], recursive));
          }
      }
    
      for (j = 0, ln = paramObjects.length; j < ln; j++) {
          paramObject = paramObjects[j];
          value = paramObject.value;
    
          if(_.isNumber(value)) {
            value = value.toString();
          } else { 
            if (_.isDate(value)) {
              value = (new Date(value)).toString();
            } else {
              if (_.isEmpty(value)) {
                value = '';
              }
            }
          }
    
          params.push(encodeURIComponent(paramObject.name) + '=' + encodeURIComponent(String(value)));
      }

      return params.join('&');    
    };
    
    /* Inicializar el plugin
     */
    var onPluginInit = function(instanceSandbox, options) {};

    /* Liberar medios
     */
    var onPluginDestroy = function() {};

    // Extender el core
    _.extend(core, {
        url: {
          encodeHash: encodeHash
        }
    }, this);

    // Extender el sandbox
    _.extend(core.Sandbox.prototype, {
      url: {
        encodeHash: encodeHash
      }
    }, this);

    return {
        init: onPluginInit,
        destroy: onPluginDestroy
    };
};
