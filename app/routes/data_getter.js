
module.exports.getConfig = function (req, res) {
    var configFile =  global.registry.dir + global.registry.config.files.js.clientConfig;
    res.send ( require (configFile) );
};