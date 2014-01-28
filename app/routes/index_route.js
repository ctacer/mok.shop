
module.exports.homePage = function(req, res){
    var homeHtml = global.registry.dir + global.registry.config.files.jade.home;
    res.render(homeHtml, { 'data' : 101 });
};

module.exports.rootPage = function(req, res){
    var homeRoute = global.registry.utils.config.getRouter (global.registry.config.routes, 'indexRoute', 'homePage');
    homeRoute = homeRoute || '/index';
    res.redirect (homeRoute);
};