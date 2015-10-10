NS('AdminJS.lib');

AdminJS.lib.Dispatcher = (function() {
  var creator = function(sb) {
	var call_signal = new Signal();
	  
    var stream = Kefir.stream(function(emitter) {
    	var call_signal_emited = function(options) {
    		emitter.emit(options);
    	};
    	call_signal.add(call_signal_emited);
	});
    
    var callHandler = function(action, options) {
      call_signal.dispath({
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
