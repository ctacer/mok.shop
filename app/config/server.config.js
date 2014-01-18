

var config = {
    "production" : {

    },
    "development" : {
        "server" : {
            "host" : "http://localhost",
            "port" : 3001
        },
        "routes" : {
            "indexRoute" : {
                "homePage" : { "type" : "get", "component" : "/index", "listener" : "homePage" }
            },
            "userRoute" : {
                "login" : { "type" : "post", "component" : "/login", "listener" : "handleRegistration" }
            }
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
                "home" : "/views/home.html"
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