NS('AdminJS.modules.login');

AdminJS.modules.sidebar.Model = function(sb) {
    'use strict';
    
    return AdminJS.lib.Model(sb, {
      menu_tree: null,
      sidebar_active: null
    });
};
