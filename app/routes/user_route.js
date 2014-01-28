
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

module.exports.logUser = function(req, res, next){
    console.log (req.body);
    global.registry.modules.passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log (err);
        }
        if (!user) {
            console.log (user);
        }
        req.logIn(user, function(err) {
            if (err) {
                console.log (err);
            }
            console.log ( user );
        });
    })(req, res, next);
    res.send("respond with a resource");
};