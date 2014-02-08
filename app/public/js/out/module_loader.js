
(function (exports) {

    var loadModule = function (moduleName, moduleLink) {
        var request = new Request ();
    };

    var require = function ( modules ) {
        for (var key in modules) {
            loadModule (key, modules[key]);
        }
    };

    exports.require = require;

} ) (this);