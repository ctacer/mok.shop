
/*
 * GET home page.
 */

module.exports.homePage = function(req, res){
    var homeHtml = registry.get ('dir') + registry.get ('config').files.html.home;
    res.sendfile(homeHtml);
};