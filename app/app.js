
registry = new (require (__dirname + "/libs/registry.js")) ();
registry.set ('dir', __dirname);
registry.set ('config', require (__dirname + "/config/server.config.js") (process.argv[2]) );
registry.set ('log', require('nlogger').logger(module) );
registry.set ('errorsListener', require(__dirname + '/libs/errors_listener.js') (global.registry.get('log')) );

var express = require('express');
var http = require('http');
var path = require('path');

registry.set ('indexRoute', require('./routes/index_route.js'));
registry.set ('userRoute', require('./routes/user_route.js'));

var app = express();

// all environments
app.set('port', process.env.PORT || registry.get ('config').server.port );
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded());

//Uncaught errors isolation
process.on('uncaughtException', function (err) {
    registry.get('errorsListener').handleUncaughtException(err);
});


require (__dirname + '/routes/route_builder.js') (app, registry.get ('config').routes);


http.createServer(app).listen(app.get('port'), function(){
  registry.get ('log').debug ('Express server listening on port ' + app.get('port'));
});
