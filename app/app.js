
global = {};
global.registry = {};
global.registry.dir = __dirname;
global.registry.config = require (__dirname + "/config/server_config.js") (process.argv[2]);
global.registry.routeConfig = require (__dirname + "/config/routes.js");
global.registry.logger = require('nlogger').logger(module);
global.registry.utils = require (__dirname + '/libs/utils.js');

global.registry.modules = {};
global.registry.modules.http = require('http');
global.registry.modules.path = require('path');

global.registry.modules.routeBuilder = require (__dirname + '/app/route_builder.js');

global.registry.routes = {};
global.registry.routes.indexRoute = require('./routes/index_route.js');
global.registry.routes.userRoute = require('./routes/user_route.js');
global.registry.routes.dataGetter = require('./routes/data_getter.js');

global.registry.db = {};
global.registry.db.modules = {};
global.registry.db.modules.mapManager = require("./db/db_map_manager.js");
global.registry.db.modules.gateway = require("./db/db_gateway.js") (global.registry.config);
global.registry.db.objects = {};
global.registry.db.objects.users = require('./db/objects/users.js') ();
global.registry.db.objects.pproducts = require('./db/objects/products.js') ();

//init function
(function () {
    "use strict";
    global.registry.modules.passport = require(__dirname + '/app/password_builder.js') (global.registry.db.objects.users.findUser);
}) ();

var express = require('express');
var app = express();

// all environments
app.set('port', process.env.PORT || global.registry.config.server.port );
app.set('views', global.registry.modules.path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(global.registry.modules.path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(global.registry.modules.passport.initialize());
app.use(global.registry.modules.passport.session());

//Uncaught errors isolation
//process.on('uncaughtException', function (err) {
//    (require(__dirname + '/libs/errors_listener.js') (global.registry.logger))
//        .handleUncaughtException(err);
//});

(function () {
    "use strict";
    global.registry.modules.routeBuilder (app, global.registry.routeConfig);
}) ();

(global.registry.modules.http.createServer(app)).listen(app.get('port'), function(){
  global.registry.logger.debug ('Express server listening on port ' + app.get('port'));
});