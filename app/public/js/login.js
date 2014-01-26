
$ (function () {

    "use strict";

    $.get ("/get/config", function (res) {
        console.log (res);
    });

    var sendUserData = function (data) {
        $.ajax ({
            'url' : data.url,
            'data' : data.user,
            'type' : data.type,
            'success' : data.callback
        });
    };

    $ ("#user-login").on ("click", function (){
        var user = {
            'name' : $ ("#user-name").val (),
            'password' : $ ("#user-password").val ()
        };

        var callback = function (res) {
            console.log (res);
        };

        var data = {
            'url' : "/user/login",
            'user' : user,
            'type' : "POST",
            'callback' : callback
        };
        sendUserData (data);
    });

    $ ("#user-registrate").on ("click", function (){
        var user = {
            'name' : $ ("#user-name").val (),
            'password' : $ ("#user-password").val (),
            'email' : $ ("#user-name").val ()
        };

        var callback = function (res) {
            console.log (res);
        };

        var data = {
            'url' : "/user/reg",
            'user' : user,
            'type' : "POST",
            'callback' : callback
        };
        sendUserData (data);
    });

});