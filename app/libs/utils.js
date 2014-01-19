module.exports = (function() {

    var config = {};

    config.getRouter = function (configRoutes, router, listener) {
        for (var i = 0; i < configRoutes.length; i++) {
            if (configRoutes[i].router == router) {
                for (var j = 0; j < configRoutes[i].components.length; j++) {
                    if (configRoutes[i].components[j].listener == listener) {
                        return configRoutes[i].components[j].component;
                    }
                }
            }
        }
        return null;
    };

    return {
        "config" : config
    };

}) ();