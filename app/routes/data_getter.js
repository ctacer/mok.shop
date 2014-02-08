
module.exports.getConfig = function (req, res) {
    var configFile =  global.registry.dir + global.registry.config.files.js.clientConfig;
    res.send ( require (configFile) );
};

module.exports.getStms = function (req, res) {
    global.registry.logger.debug ( JSON.stringify(req.query) );
    res.send ( req.query );
};