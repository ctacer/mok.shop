/**
 * Custom queries to DB
 * @return
 */
module.exports = function(config){
    var dbGateway = require("./db_gateway.js")(config);

    var dbFunctions = {

        'select' : function (table, condition, cb) {
            dbGateway.select (table, condition, cb);
        }

    };
    return dbFunctions;
};