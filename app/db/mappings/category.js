
module.exports = function (proto) {
    var mappingProto = function () {
        this.schema = {
            "table" : "t_categories",
            "mappings" : {
                "id" : "id",
                "name" : "name"
            }
        };

        this.id = null;
        this.name = null;
    };

    mappingProto.prototype = proto;

    var mappingConstructor = function () {};

    mappingConstructor.prototype = new mappingProto ();

    return mappingConstructor;
};