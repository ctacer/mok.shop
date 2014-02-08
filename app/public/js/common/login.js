
$ (function () {

    "use strict";

    /**
     * function handles all login relative ajax request to server
     * @param data
     */
    var sendUserData = function (data) {
        $.ajax ({
            'url' : data.url,
            'data' : data.user,
            'type' : data.type || "GET",
            'success' : data.callback || function () {}
        });
    };

    var requestSucceed = function (userName) {
        $("#user-name").text(userName);
        $(".user-block,.login-block").toggleClass("hidden");
        $("#login-user-name,#login-user-password,#login-user-email").val("");
    };

    var loginBtnHandler = function (){
        var user = {
            'username' : $("#login-user-name").val (),
            'password' : $("#login-user-password").val ()
        };

        var callback = function (res) {
            if (res.ok && res.data.user) {
                requestSucceed(res.data.user.name);
            }
        };

        var data = {
            'url' : "/user/in",
            'user' : user,
            'type' : "POST",
            'callback' : callback
        };
        sendUserData (data);
    };
    $("#login-user").on("click", loginBtnHandler);

    var enterHitHandler = function (event) {
        if (!event.which.isEnterKey()) return;

        var username = $("#login-user-name");
        var password = $("#login-user-password");
        if (!username.val().length) {
            username.focus();
        }
        else if (!password.val().length) {
            password.focus();
        }
        else {
            loginBtnHandler();
        }
    };
    $("#login-user-name, #login-user-password").on("keypress", enterHitHandler);

    var registrateNewUser = function (){
        var user = {
            'name' : $("#login-user-name").val(),
            'password' : $("#login-user-password").val(),
            'email' : $("#login-user-name").val()
        };

        var callback = function (res) {
            if (res.ok) {
                requestSucceed(user.name);
            }
            else {
                console.log (res.err.message);
            }
        };

        var data = {
            'url' : "/user/reg",
            'user' : user,
            'type' : "POST",
            'callback' : callback
        };
        sendUserData (data);
    };
    $("#registrate-user").on("click", registrateNewUser);

    /**
     * function handler for log-out event
     */
    var logOut = function () {
        var callback = function (res) {
            if(res.ok) {
                requestSucceed("");
            }
        };
        var data = {
            "url" : "/user/out",
            "type" : "POST",
            "callback" : callback
        };
        sendUserData(data);
    };
    $("#logout-user").on("click", logOut);

});