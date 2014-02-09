
module.exports = function (proto) {
    var mappingProto = function () {
        this.schema = {
            "table" : "t_product_description",
            "mappings" : {
                "id" : "id",
                "productId" : "product_id",
                "name" : "name",
                "price" : "price"
            }
        };

        this.id = null;
        this.productId = null;
        this.name = null;
        this.price = null;
    };

    mappingProto.prototype = proto;

    var mappingConstructor = function () {};

    mappingConstructor.prototype = new mappingProto ();

    return mappingConstructor;
};