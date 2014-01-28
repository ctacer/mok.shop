/**
 * Defines low level common DB functions
 * @returns {{connect: Function, disconnect: Function, insert: Function, remove: Function, select: Function}}
 */
module.exports = function(__config){
    var config = __config || global.registry.config;
    var mysql = require('mysql');
    var MySQLPool = require("mysql-pool").MySQLPool;
    var client = new MySQLPool({
        poolSize: config.db.poolSize,
        user:     config.db.user,
        password: config.db.password,
        database: config.db.dbName,
        host: config.db.host,
        supportBigNumbers : true
    });

    /**
    * Slashes arguments to use in MySQL DB queries
    */
    var addSlashes = function (str){
        if (str && typeof str != "number"){
            str = str.replace(/\\/g,'\\\\');
            str = str.replace(/\'/g,'\\\'');
            str = str.replace(/\"/g,'\\"');
            str = str.replace(/\0/g,'\\0');
        }
        return str;
    };

    /**
     * Converts object into string of comma separated string of key = 'value' pairs, to use in SQL
     */
    var getKeyValExpr = function(obj){
        var result = '';
        var key;
        for (key in obj) {
            result += '`' + key + '`= ' + client.escape(obj[key]) + ', ';
        }
        if (result.length>0){
            result = result.substr(0, result.length - 2);
        }
        return result;
    };

    var getKeyValExprAnd = function(obj){
        var result = '';
        var key;
        for (key in obj) {
            result += '`' + key + '`= ' + client.escape(obj[key]) + ' AND ';
        }
        if (result.length>0){
            result = result.substr(0, result.length - 5);
        }
        return result;
    };

    /**
     * Single point to execute all the queries
     */
    var executeQuery = function(query, cb){
        cb = cb || function () {};
        client.query(query, function (error, result, fields) {
            if (error) {
                throw error;
            }else{
                cb(result, fields);
            }
        });
    };

    var gateway = {
        'client' : client,

        /**
         * Slashes special characters
         */
        'escape' : function(val){ return client.escape(val); },

        /**
         * Execute custom query
         */
        'execute' : executeQuery,

        /**
         * Inserts record provided as field->val set, Ignores if already exists
         */
        'insertIgnore': function (table, obj, cb) {
            cb = cb || function () {};
            var query = 'INSERT IGNORE INTO `' + table + '` SET ' + getKeyValExpr(obj);
            executeQuery(query, function (result, fields) { cb(result.affectedRows); });
        },

        /**
         * Inserts record provided as field->val set
         */
        'insert': function (table, obj, cb) {
            cb = cb || function () {};
            var query = 'INSERT INTO `' + table + '` SET ' + getKeyValExpr(obj);
            executeQuery(query, function (result, fields){ cb(result); });
        },

        /**
         * Inserts multiple records in one query
         * obj in format: [{key1: val, key2: val }, {key1: val, key2: val }, ...]
         */
        'insertAll': function (table, obj, cb) {
            cb = cb || function () {};
            var query = 'INSERT INTO `' + table + '` VALUES';
            var i=0;
            for(; i < obj.length; i++){
                query += " (";
                for (key in obj[i]) {
                    query +=  client.escape(obj[i][key]) + ', ';
                }
                query = query.substr(0, query.length - 2);
                query += "),";
            }

            if(i > 0){
                query = query.substr(0, query.length - 1);
            }
            executeQuery(query, function (result, fields){ cb(result); });
        },

        /**
         * Inserts or update (if already exists)
         * record provided as field->val set
         */
        'insertUpdate': function (table, obj, cb) {
            cb = cb || function () {};
            var query = 'INSERT INTO `' + table + '` SET ' + getKeyValExpr(obj) + ' ON DUPLICATE KEY UPDATE ' + getKeyValExpr(obj);
            executeQuery(query, function (result, fields){ cb(result); });
        },

        /**
         * Deletes records that fits in given condition (set of field -> value)
         */
        'remove': function (table, condition, cb) {
            cb = cb || function () {};
            var query = 'DELETE FROM `' + table + '` WHERE ' + getKeyValExpr(condition);
            executeQuery(query, function (result, fields) { cb(); } );
        },

        /**
         * Updates given record(s) if they fit in given condition (set of field -> value)
          */
        'update': function (table, fieldVals, condition, cb) {
            cb = cb || function () {};
            var query = 'UPDATE `' + table + '` SET ' + getKeyValExpr(fieldVals) + ' WHERE ' + getKeyValExpr(condition);
            executeQuery(query, function(result, fields){ cb(result) });
        },

        /**
         * Selects data from table where fields given as keys in "condition" object match values.
         */
        'select': function (table, condition, cb) {
            cb = cb || function () {};
            var query = 'SELECT * FROM `' + table + '`';
            if(condition)query = query +' WHERE ' + getKeyValExprAnd(condition);
            executeQuery(query, function(result, fields){cb(result);});
        },

        /**
         * Returns first row that fits in given condition (set of field -> value), or false if not found
         */
        'selectFirst' : function(table, condition, cb){
            cb = cb || function () {};
            var query = 'SELECT * FROM `' + table + '`';
            if(condition)query = query +' WHERE ' + getKeyValExprAnd(condition) + ' LIMIT 1;';
            executeQuery(query, function(result, fields){
                var res = result.length > 0 ? result[0] : false;
                cb(res);
            });
        }

        /**
         * Selects all data from table
         */
        , 'selectAll': function (table, cb) {
            cb = cb || function () {};
            var query = 'SELECT * FROM `' + table + '`';
            executeQuery(query, function(result, fields){cb(result);});
        }
    };

	return gateway;
}