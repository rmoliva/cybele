NS('AdminJS.modules.login');

AdminJS.modules.sidebar.Model = {
  create: function(sb) {
    'use strict';
    
    return AdminJS.lib.Model.create({
      sb: sb, 
      values: {
        menu_tree: null,
        sidebar_active: null
      }
    });
  }
};
