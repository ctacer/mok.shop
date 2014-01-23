
module.exports.getConfig = function (req, res) {
    var configFile =  registry.get ('dir') + registry.get ('config').files.js.clientConfig;
    res.send ( require (configFile) );
};