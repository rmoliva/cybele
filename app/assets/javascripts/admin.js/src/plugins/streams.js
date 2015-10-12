NS('AdminJS.plugins');

var SignalStreamObject = function(sb) {
  var stream = Kefir.pool();

	var dispatch = function(options) {
	  stream.plug(Kefir.constant(options));
	};

	return {
		stream: stream,
		dispatch: dispatch
	};
};
	
AdminJS.plugins.Streams = function(core, options) {
    'use strict';
    

	var signal = function(sb) {
		return new SignalStreamObject(sb);
    };

    /* Inicializar el plugin
     */
    var onPluginInit = function(instanceSandbox, options) {};

    /* Liberar medios
     */
    var onPluginDestroy = function() {};

    // Extender el core
    _.extend(core, {
        streams: {
            signal: signal
        }
    }, this);

    // Extender el sandbox
    _.extend(core.Sandbox.prototype, {
        streams: {
            signal: signal
        }
    }, this);

    return {
        init: onPluginInit,
        destroy: onPluginDestroy
    };
};
