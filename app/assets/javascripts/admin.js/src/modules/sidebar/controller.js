NS('AdminJS.modules.sidebar');

AdminJS.modules.sidebar.Controller = function(sb, model) {
  'use strict';

  return AdminJS.lib.Controller(sb, null, model, {
    handleClick: function(state) {
      sb.hash.setHash(state.link);
    },
  });
};