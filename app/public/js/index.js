
$ ( function () {

    "use strict";

    var sendUserData = function (props) {
        var reqData = { };
        reqData.url = props.url;
        props.data && (reqData.data = props.data);
        reqData.type = props.type || "GET";
        reqData.success = props.callback;

        $.ajax (reqData);
    };

    $ ("#nav-smts").on ("click", function () {

        var callback = function (res) {
            console.log (res);
        };

        var data = {
            'url' : "/get/stms",
            'callback' : callback
        };
        sendUserData (data);
    });

});