
var MapManager = function () {

    var mapProto = require("./db_map_proto.js");
    var self = this;

    this.user = (require ("./mappings/users.js")) (mapProto);
    this.mark = (require ("./mappings/mark.js")) (mapProto);
    this.subCategory = (require ("./mappings/sub_category.js")) (mapProto);
    this.category = (require ("./mappings/category.js")) (mapProto);
    this.productDescription = (require ("./mappings/product_description.js")) (mapProto);
    this.product = (require ("./mappings/products.js")) (mapProto);

    this.schemas = {
        'user':(new this.user()).schema,
        'mark' : this.mark = (new this.mark()).schema,
        'subCategory' : this.subCategory = (new this.subCategory()).schema,
        'category' : this.category = (new this.category()).schema,
        'productDescription' : this.productDescription = (new this.productDescription()).schema,
        'product' : this.product = (new this.product()).schema
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

            while ( index != -1 ) {
                index = str.indexOf(unMapPattern);
                if (index == -1) {
                    query += str;
                    break;
                }

                query += str.substring(0, index);
                str = str.substring(index + unMapPattern.length);

                startIndex = findInBracket (str);
                if (startIndex != -1) {
                    startIndex++;
                    endIndex = findOutBracket (str.substring(startIndex));
                    if (endIndex == -1) break;
                    endIndex += startIndex;

                    query += replaceMaps (str.substring(startIndex, endIndex));
                }
                str = str.substring(endIndex+1);
            }

        }) ();

        return query;
    }

    function findInBracket (str) {
        return str.indexOf("(");
    }

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
            query += "" + map.table + "";
        }
        else {
            query += parts[0];
        }
        if (parts[1]) {
            if (map && map.mappings.hasOwnProperty(parts[1])) {
                query += "." + map.mappings[ parts[1] ] + "";
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
        var mixings = [",", "(", ")"];

        for (var i = 0; i < words.length; i ++) {
            word = words[i];
            if (mixings.indexOf(word[0]) != -1) {
                query += " " + word[0] + " ";
                word = word.substring (1);
            }
            if (mixings.indexOf(word[ word.length - 1 ]) != -1) {
                mixing = " " + word[ word.length - 1 ] + " ";
                word = word.substring (0, word.length - 1 );
            }
            query += unMapWord (word) + mixing;
            mixing = "";
        }
        return query;
    };


};

module.exports = new MapManager ();