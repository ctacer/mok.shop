
module.exports = function () {

    var db = global.registry.db.modules.gateway;
    var mapManager = global.registry.db.modules.mapManager;

    return {

        /**
         * function checks if user already exists in db
         */
        "checkUserExist" : function (user, cb) {
            this.findUser({ 'name' : user.name }, function (result) {
                cb (!!result);
            });
        },

        /**
         * db function for inserting of the new user into 't_users' db
         */
        "newUser" : function ( user, cb ) {
            cb = cb || function () {};

            var query =
                " INSERT INTO UNMAP(user) UNMAP((user.name, user.email, user.password)) " +
                " SELECT " + db.escape(user.name) + ", " + db.escape(user.email) + ", " + db.escape(user.password) +
                " FROM (SELECT 1) ff " +
                " WHERE NOT EXISTS ( " +
                " SELECT tu.name " +
                " FROM UNMAP(user) tu " +
                " WHERE tu.name = " + db.escape(user.name) +
                " LIMIT 1 )";

            var unMapQuery = mapManager.getQuery(query);
            db.execute (unMapQuery, function(result) {
                var userIsInserted = true;
                var err = {};
                if (result.affectedRows == 0) {
                    err.message = "user already exists";
                    userIsInserted = false;
                }
                cb ({ "ok" : userIsInserted, "err" : err });
            });
        },

        /**
         * function approver for password authorization
         */
        "findUser" : function (userData, cb) {
            cb = cb || function () {};
            var user = new (mapManager.user) ();
            user.map (userData);
            var table = user.getTable();
            var data = user.unmap ();
            db.select(table, data, function (data) {
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
};