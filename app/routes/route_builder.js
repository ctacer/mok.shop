

module.exports = function ( app, routes ) {

    var route;
    for (var key in routes) {
        if (!routes.hasOwnProperty (key)) continue;

        route = registry.get (key);
        if (route && route.hasOwnProperty (routes[key].listener)) {
            app[routes[key].type] ( routes[key].component, route[routes[key].listener] );
        }
    }
};