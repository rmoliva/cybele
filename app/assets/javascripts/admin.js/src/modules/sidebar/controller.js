NS('AdminJS.modules.sidebar');

AdminJS.modules.sidebar.Controller = function(sb, model) {
  'use strict';

  return {
    handleInit: function(options) {
      // inicializar el modelo
    },
    handleClick: function(state) {
      sb.hash.setHash(state.link);
    }
  }
};