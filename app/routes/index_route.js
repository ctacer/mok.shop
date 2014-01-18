
/*
 * GET home page.
 */

module.exports.homePage = function(req, res){
  res.sendfile( registry.get ('dir') + registry.get ('config').files.html.home );
};