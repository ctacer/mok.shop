/**
 * Custom queries to DB
 * @return
 */
module.exports = function(config){
    var dbGateway = require("./db_gateway.js")(config);
    var mapManager = require("./db_map.js");


    var dbFunctions = {

        'select' : function (table, condition, cb) {
            dbGateway.select (table, condition, cb);
        },

        'findUser' : function (userData, cb) {
            cb = cb || function () {};
            var user = new (mapManager.user) ();
            user.map (userData);
            var table = user.getTable();
            var data = user.unmap ();
            dbGateway.select(table, data, function (data) {
                if (data && data.length) {
                    var user = new (mapManager.user) ();
                    user.map (data[0]);
                    cb (user);
                }
                else {
                    cb ();
                }
            });
        }

    };
    return dbFunctions;
};