NS('AdminJS.modules.topnav');

AdminJS.modules.topnav.Model = {
  create: function(sb) {
    return AdminJS.lib.Model.create({
      sb: sb, 
      values:{
        user_name: null
      }
    });
  }
};
