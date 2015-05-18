
model.exports = {
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
