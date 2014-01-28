
module.exports = function (proto) {
    var mappingProto = function () {
        this.schema = {
            "table" : "t_users",
            "mappings" : {
                "email" : "email",
                "name" : "name",
                "password" : "password",
                "isAdmin" : "is_admin"
            }
        };

        this.email = null;
        this.name = null;
        this.password = null;
        this.isAdmin = null;
    };

    mappingProto.prototype = proto;

    var mappingConstructor = function () {};

    mappingConstructor.prototype = new mappingProto ();

    return mappingConstructor;
};