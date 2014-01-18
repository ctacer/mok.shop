/**
* The registry to be used for storing common objects that are used across application.
*/
module.exports = function(){

    /**
     * Used to store registry items
     * @type {{}}
     * @private
     */
	this._items = {};

    /**
     * Put the object to the registry using given key, replaces the object if it already exists
     * @param key
     * @param instance
     */
	this.add = function(key, instance){
		this._items[key] = instance;
	};

    /**
     * Get the object with given key from the registry
     * @param key
     * @returns {*} object or null if object with given key not found in registry
     */
	this.get = function(key){
		if(!(key in this._items)){
			return null;
		}
		return this._items[key];
	};
};