

module.exports = function ( app, routes ) {

    var route, routeComponents;

    for (var i = 0; i < routes.length; i++) {

        route = registry.get (routes[i].router);
        routeComponents = routes[i].components;
        if (!route) continue;

        for (var j = 0; j < routeComponents.length; j++) {

            registry.get ('log').info (
                "Express listens \t" + routeComponents[j].type.toUpperCase () + " '" + routeComponents[j].component + "' request "
            );
            app[routeComponents[j].type] ( routeComponents[j].component, route[routeComponents[j].listener] );
        }
    }
};