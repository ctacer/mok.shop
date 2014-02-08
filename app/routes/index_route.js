

module.exports.homePage = function(req, res){
    //req.isAuthenticated()
    var homeHtml = global.registry.dir + global.registry.config.files.jade.home;
    res.render(homeHtml, { 'user' : req.user });
};

module.exports.rootPage = function(req, res){
    var homeRoute = global.registry.utils.config.getRouter (global.registry.routeConfig, 'indexRoute', 'homePage');
    homeRoute = homeRoute || '/index';
    res.redirect (homeRoute);
};