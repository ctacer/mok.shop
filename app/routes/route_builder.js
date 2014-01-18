

module.exports = function ( app, routes ) {

    var route, subRoute;

    for (var key in routes) {
        if (!routes.hasOwnProperty (key)) continue;

        route = registry.get (key);
        subRoute = routes[key];
        if (route) {
            for (var subKey in subRoute) {
                if (!subRoute.hasOwnProperty (subKey)) continue;

                registry.get ('log').info (
                    "Express listens \t" + subRoute[subKey].type.toUpperCase () + " " + subRoute[subKey].component + " request "
                );
                app[subRoute[subKey].type] ( subRoute[subKey].component, route[subRoute[subKey].listener] );
            }
        }
    }
};