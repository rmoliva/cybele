NS('AdminJS.modules.users');

AdminJS.modules.users.Model = function(sb) {
    'use strict';

    // El siguiente hash contiene todas las variables con datos
    // del modelo
    var def_values = {
      loading_spinner: false,
      records: [],
      page: 1,
      per_page: 15,
      total: 1, // Numero total de registros
      page_count: 5 // Numero de paginas segun el numero de registros
    };
    
    // El siguiente es un array de aquellas variables que deben ir al
    // hash
    var hash_keys = [
      "page",
      "per_page"
    ];
    
    return AdminJS.lib.Model(sb, def_values, hash_keys);
};
