
$ (function () {

    "use strict";

    $.get ("/get/config", function (res) {
        console.log (res);
    });
});