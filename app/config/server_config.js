

var config = {
    "production" : {

    },
    "development" : {
        "server" : {
            "host" : "http://localhost",
            "port" : 3001
        },
        "db" : {
            "host" : 'localhost',
            "port" : 3306,
            "user" : 'web',
            "password" : 'qwerty',
            "dbName" : 'mok.shop',
            "poolSize" : 4
        },
        "files" : {
            "html" : {
            },
            "jade" : {
                "home" : "/views/home.jade"
            },
            "js" : {
                "clientConfig" : "/config/client_config.js"
            }
        }
    }
};

module.exports = function ( env ) {
    var conf = config[env] || config.production;
    for (var key in config.development) {
        if ( !conf.hasOwnProperty (key) ) {
            conf[key] = config.development[key];
        }
    }
    return conf;
};