

module.exports = function ( app, routes ) {

    var route, routeComponents;

    for (var i = 0; i < routes.length; i++) {

        route = global.registry.routes[routes[i].router];
        routeComponents = routes[i].components;
        if (!route) continue;

        for (var j = 0; j < routeComponents.length; j++) {

            global.registry.logger.info (
                "Express listens \t" + routeComponents[j].type.toUpperCase () + " '" + routeComponents[j].component + "' request "
            );
            app[routeComponents[j].type] ( routeComponents[j].component, route[routeComponents[j].listener] );
        }
    }
};