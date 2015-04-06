NS('AdminJS');

AdminJS.I18n = function(core) {
    'use strict';
    
    var scope = 'js.adminjs';
    var locale = 'en';

    var initialize = function(options) {
      moment.locale(options.locale);
      
      console.log(options.locale);
      locale = options.locale;
      I18n.locale = locale;
    };
    
    var destroy = function() {
      
    };
      
    var translate = function(key, options) {
      if(!options) {
        options = {};
      }
      options = _.merge(options, {scope: scope});
      return I18n.t(key, options);
    };
      
    return {
      initialize: initialize,
      destroy: destroy,
      t: translate
    };
};
