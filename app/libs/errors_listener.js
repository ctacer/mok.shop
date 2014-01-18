var errorsListener = function(logger){

    var logger = logger || registry.get('log');
	
	/**
	 * Gets string with stack trace to use in logs for the provided error type
	 * and error object.
	 */
	var getDetailedErrorMessage = function(errorType, err){
		var message = '';
		if (typeof err === 'object') {
			if (err.message) {
            	message += '\n[ ' + errorType + ' ] Message: ' + err.message + "\n";
            }
            if (err.stack) {

            	message += "[ " + errorType + " ] Stacktrace:\n";
            	message += "========== start ==========\n";
            	message += err.stack;
            	message += "\n=========== end ===========\n";
            }
        } else {
        	message += '[ ' + errorType + ' ] thrown error is not an object\n';
        }
		return message;
	};
	
	/**
	 * Handler for uncaught exceptions. 
	 * Sends critical errors notification by email and stores it to general log.
	 */
	var handleUncaughtException = function(err){
    	var message = getDetailedErrorMessage('UNCAUGHT_ERROR', err);
        logger.error(message);
	};
	
	/**
	 * The error listener instance
	 */
	var instance = {
		'handleUncaughtException' : handleUncaughtException,
        'getDetailedErrorMessage' : getDetailedErrorMessage
	};
	
	return instance;
	
};

module.exports = errorsListener;
