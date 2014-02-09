
module.exports = function () {

    var db = global.registry.db.modules.gateway;
    var mapManager = global.registry.db.modules.mapManager;

    return {

        /**
         * function returns all products for given category
         */
        'getProductsForCategory' : function (getData, cb) {
            cb = cb || function () {};
            var query =
                "";

            var builtQuery = mapManager.getQuery(query);
            db.execute(builtQuery, function (selectResult) {
                //loop through all result rows and unmap for future user
                cb (selectResult.rows);
            });
        }

    };
};