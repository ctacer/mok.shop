
global = {};
global.registry = {};
global.registry.dir = __dirname;
global.registry.config = require (__dirname + "/config/server.config.js") (process.argv[2]);
global.registry.logger = require('nlogger').logger(module);
global.registry.utils = require (__dirname + '/libs/utils.js');

var express = require('express');

global.registry.modules = {};
global.registry.modules.http = require('http');
global.registry.modules.path = require('path');

global.registry.modules.passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

global.registry.routes = {};
global.registry.routes.indexRoute = require('./routes/index_route.js');
global.registry.routes.userRoute = require('./routes/user_route.js');
global.registry.routes.dataGetter = require('./routes/data_getter.js');

global.registry.db = {};
global.registry.db.functions = require ('./db/db_functions.js') (global.registry.config);

/**
 * Passport setup
 */
function findByEmail(name, fn) {
    global.registry.db.functions.findUser({ name : name }, function(user) {
        if(user){
            fn(null, user);
        } else {
            fn(new Error('User ' + name + ' does not exist'));
        }
    });
}

// Passport session setup
global.registry.modules.passport.serializeUser(function(user, done) {
    done(null, user.name);
});

global.registry.modules.passport.deserializeUser(function(name, done) {
    findByEmail(name, function (err, user) {
        done(err, user);
    });
});

// Use the LocalStrategy within Passport and additional "is_approved" field
global.registry.modules.passport.use(new LocalStrategy(
    function(username, password, done) {
        process.nextTick(function () {
            global.registry.db.functions.findUser({ name : username }, function(user) {
                if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                if (user.password != password) { return done(null, false, { message: 'Incorrect password ' }); }
                return done(null, user);
            });
        });
    }
));

var app = express();

// all environments
app.set('port', process.env.PORT || global.registry.config.server.port );
app.set('views', global.registry.modules.path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(global.registry.modules.passport.initialize());
app.use(global.registry.modules.passport.session());
app.use(express.static(global.registry.modules.path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded());

//Uncaught errors isolation
process.on('uncaughtException', function (err) {
    (require(__dirname + '/libs/errors_listener.js') (global.registry.logger))
        .handleUncaughtException(err);
});

require (__dirname + '/routes/route_builder.js') (app, global.registry.config.routes);

(global.registry.modules.http.createServer(app)).listen(app.get('port'), function(){
  global.registry.logger.debug ('Express server listening on port ' + app.get('port'));
});
