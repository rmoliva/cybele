NS('AdminJS.modules.topnav');

AdminJS.modules.topnav.Controller = function(sb, model) {
  'use strict';

  // No se necesita un fsm
  return AdminJS.lib.Controller(sb, null, model, {
    handleOnLogout: function() {
      if(confirm(t("confirm_logout"))) {
        sb.session.logout().then(function() {
          window.location.href = "/";
        });
      }
    }
  });
};