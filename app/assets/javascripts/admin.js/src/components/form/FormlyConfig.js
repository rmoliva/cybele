NS('AdminJS.components.formly');

AdminJS.components.form.Config = function() {
    'use strict';

  var fieldTypeMap = {};
  
  function addFieldType(name, field) {
    if (Array.isArray(name)) {
      name.forEach(function(fieldType) {
        addFieldType(fieldType);
      });
    } else if (typeof name === 'object') {
      field = name.field;
      name = name.name;
    }
    fieldTypeMap[name] = field;
  }
  
  function getFieldTypes() {
    return fieldTypeMap;
  }
  
  function clearTypes() {
    var oldTypes = fieldTypeMap;
    fieldTypeMap = {};
    return oldTypes;
  }

  return {
    fields: {
      addType: addFieldType,
      getTypes: getFieldTypes,
      clearTypes: clearTypes
    }
  };
}();

