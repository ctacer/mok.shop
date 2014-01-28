module.exports = {

    "getTable" : function () {
        return this.schema.table;
    },

    "getField" : function (field) {
        return this.schema.mappings[field];
    },

    "unmap" : function ( ) {
        var self = this;
        var obj = {};
        for (var key in self.schema.mappings) {
            if (!self.schema.mappings.hasOwnProperty (key) || !self[key]) continue;
            obj[self.schema.mappings[key]] = self[key];
        }
        return obj;
    },

    "map" : function (obj) {
        var self = this;
        for (var key in self.schema.mappings) {
            if (!self.schema.mappings.hasOwnProperty (key)) continue;
            self[key] = obj[self.schema.mappings[key]];
        }
    }

};