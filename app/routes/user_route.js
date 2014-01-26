
/*
 * GET users listing.
 */

module.exports.handleRegistration = function(req, res){
    res.send("respond with a resource");
};

module.exports.saveUser = function(req, res){
    console.log (req.body);
    res.send("respond with a resource");
};

module.exports.logUser = function(req, res){
    console.log (req.body);
    res.send("respond with a resource");
};