
module.exports.homePage = function(req, res){
    var homeHtml = registry.get ('dir') + registry.get ('config').files.jade.home;
    res.render(homeHtml, { 'data' : 101 });
};

module.exports.rootPage = function(req, res){
    var homeRoute = registry.get ('utils').config.getRouter (registry.get ('config').routes, 'indexRoute', 'homePage');
    homeRoute = homeRoute || '/index';
    res.redirect (homeRoute);
};