
/*
 * user log out route
 */
module.exports.logUserOut = function(req, res){
    req.logout();
    res.send({"ok" : true});
};

/**
 * route for registration og the new user
 */
module.exports.regUser = function(req, res){
    var newUser = {
        "name" : req.body.name,
        "email" : req.body.email,
        "password" : req.body.password
    };
    global.registry.db.objects.users.newUser(newUser, function (insertResult) {
        res.send(insertResult);
    });
};

/**
 * user log in route
 */
module.exports.logUserIn = function(req, res) {
    var response = {};
    var loginStatus = false;
    global.registry.modules.passport.authenticate('local', function(err, user, info) {
        if (err) {
            response.err = err;
        }
        if (!user) {
            response.err = { "message" : "no user" };
        }
        req.logIn(user, function(err) {
            if (err) {
                response.err = err;
            }
            else {
                loginStatus = true;
                response.user = user;
            }
            res.send({ "ok" : loginStatus , "data" : response });
        });
    })(req, res);
};