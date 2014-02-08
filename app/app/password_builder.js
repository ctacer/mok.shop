
module.exports = function ( findUser ) {

    "use strict";

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    /**
     * Passport setup
     */
    function findByName(name, fn) {
        findUser({ name : name }, function(user) {
            if(user){
                fn(null, user);
            } else {
                fn(new Error('User ' + name + ' does not exist'));
            }
        });
    }

    // Passport session setup
    passport.serializeUser(function(user, done) {
        done(null, user.name);
    });

    passport.deserializeUser(function(name, done) {
        findByName(name, function (err, user) {
            done(err, { 'name' : user.name});
        });
    });

    // Use the LocalStrategy within Passport and additional "is_approved" field
    passport.use(new LocalStrategy(
        function(username, password, done) {
            process.nextTick(function () {
                findUser({ name : username }, function(user) {
                    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                    if (user.password != password) { return done(null, false, { message: 'Incorrect password ' }); }
                    return done(null, { 'name' : user.name });
                });
            });
        }
    ));

    return passport;
};