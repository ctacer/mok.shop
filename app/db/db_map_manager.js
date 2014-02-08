
var MapManager = function () {

    var mapProto = require("./db_map_proto.js");
    var self = this;

    this.user = (require ("./mappings/users.js")) (mapProto);

    this.schemas = {
        'user':(new this.user()).schema
    };

    this.map = function (map) {
        if (this.schemas[map]) {
            return (mapHelper (this.schemas[map]));
        }
        else {
            throw new Error ("unknow map type");
        }
    };

    this.getQuery = getQuery;

    function mapHelper (schema) {
        var exports = {};

        exports.getTable = function () {
            return schema.table;
        };
        exports.getField = function (field) {
            return schema.mappings[field];
        };
        return exports;
    }

    function getQuery (str) {
        var unMapPattern = "UNMAP";
        var escapePattern = "**ESCAPE**";
        var query = "";

        (function () {

            var index = 0;
            var startIndex, endIndex;

            while ( index < str.length ) {
                index = str.indexOf(unMapPattern);
                if (index == -1) break;

                index += unMapPattern.length;
                startIndex = findInBracket (str.substring(index));
                if (startIndex != -1) {
                    startIndex += index + 1;
                    endIndex = findOutBracket (str.substring(startIndex));
                    if (endIndex == -1) break;

                    endIndex += index;
                    query += replaceMaps (str.substring(startIndex, endIndex));
                }
            }

        }) ();

        return query;
    }

    function findInBracket (str) {
        return str.indexOf("(");
    };

    function findOutBracket (str) {
        var count = 1;
        for (var i = 0; i < str.length; i ++) {
            if (str[i] == "(") {
                count++;
            }
            if (str[i] == ")") {
                count--;
            }
            if (count == 0) {
                return i;
            }
            if (count < 0) {
                return -1;
            }
        }
        return -1;
    };

    function unMapWord (str) {
        var query = " ";
        var parts = str.split(".");
        var map;
        if (self.schemas.hasOwnProperty(parts[0])) {
            map = self.schemas[ parts[0] ];
            query += "\"" + map.table + "\"";
        }
        else {
            query += parts[0];
        }
        if (parts[1]) {
            if (map && map.mappings.hasOwnProperty(parts[1])) {
                query += ".\"" + map.mappings[ parts[1] ] + "\"";
            }
            else {
                query += "." + parts[1];
            }
        }
        return query + " ";
    };

    function replaceMaps (str) {
        var query = "";
        var words = str.split (/\s+/);
        var word, mixing = "";

        for (var i = 0; i < words.length; i ++) {
            word = words[i];
            if (word[0] == ",") {
                query += " , ";
                word = word.substring (1);
            }
            if (word[ word.length ] == ",") {
                word = word.substring (0, word.length-1 );
                mixing = " , ";
            }
            query += unMapWord (word) + mixing;
            mixing = "";
        }
    };


};

module.exports = new MapManager ();