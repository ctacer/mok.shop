

var config = {
    "production" : {

    },
    "development" : {
        "server" : {
            "host" : "http://localhost",
            "port" : 3001
        },
        "routes" : [
            {
                "router" : "indexRoute",
                "components" : [
                    { "type" : "get", "component" : "/index", "listener" : "homePage" },
                    { "type" : "get", "component" : "/", "listener" : "rootPage" }
                ]
            },
            {
                "router" : "userRoute",
                "components" : [
                    { "type" : "post", "component" : "/login", "listener" : "handleRegistration" }
                ]
            },
            {
                "router" : "dataSender",
                "components" : [
                    { "type" : "get", "component" : "/get/config", "listener" : "getConfig" }
                ]
            }
        ],
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
            },
            "js" : {
                "clientConfig" : "/config/client.config.js"
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