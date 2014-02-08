module.exports = [
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
            { "type" : "post", "component" : "/user/out", "listener" : "logUserOut" },
            { "type" : "post", "component" : "/user/in", "listener" : "logUserIn" },
            { "type" : "post", "component" : "/user/reg", "listener" : "regUser" }
        ]
    },
    {
        "router" : "dataGetter",
        "components" : [
            { "type" : "get", "component" : "/get/config", "listener" : "getConfig" },
            { "type" : "get", "component" : "/get/stms", "listener" : "getStms" }
        ]
    }
];