NS('AdminJS.modules.login');

AdminJS.modules.login.Model = {
  create: function(sb) {
    'use strict';
    
    return AdminJS.lib.Model.create({
      sb: sb,
      values: {
        spinner: false
      }
    });
  }
};
