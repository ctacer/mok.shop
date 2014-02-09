
module.exports = function (proto) {
    var mappingProto = function () {
        this.schema = {
            "table" : "t_products",
            "mappings" : {
                "id" : "id",
                "owner" : "owner",
                "category" : "category",
                "mark" : "mark"
            }
        };

        this.id = null;
        this.owner = null;
        this.category = null;
        this.mark = null;
    };

    mappingProto.prototype = proto;

    var mappingConstructor = function () {};

    mappingConstructor.prototype = new mappingProto ();

    return mappingConstructor;
};