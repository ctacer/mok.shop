

var MapManager = function () {

    var mapProto = require("./db_map_proto.js");

    this.user = (require ("./mappings/users.js")) (mapProto);

    this.schemas = {
        'user':(new this.user()).schema
    };

    var mapHelper = function (schema) {
        this.table = schema.table;
        this.mappings = schema.mappings;

        this.getTable = function () {
            return this.table;
        };
        this.getField = function (field) {
            return this.mappings[field];
        };
    };

    this.map = function (map) {
        if (this.schemas[map]) {
            return (new mapHelper (this.schemas[map]));
        }
        else {
            throw new Error ("unknow map type");
        }
    };
};

module.exports = new MapManager ();