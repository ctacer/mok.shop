
module.exports = function (proto) {
    var mappingProto = function () {
        this.schema = {
            "table" : "t_sub_categories",
            "mappings" : {
                "id" : "id",
                "name" : "name",
                "parentCategory" : "parent_category"
            }
        };

        this.id = null;
        this.name = null;
        this.parentCategory = null;
    };

    mappingProto.prototype = proto;

    var mappingConstructor = function () {};

    mappingConstructor.prototype = new mappingProto ();

    return mappingConstructor;
};