NS('AdminJS.lib');

AdminJS.lib.Dispatcher = (function() {
  var creator = function(sb) {
    var stream = new Bacon.Bus();
    
    var callHandler = function(action, options) {
      stream.push({
        action: action, 
        options: options
      });
    };
    
    return {
      call: callHandler,
      stream: stream 
    };    
  };
  
  return {
    create: creator  
  };   
}());
