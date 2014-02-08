var Request = function (props) {
    this.requestType = props.type.toUpperCase () || "GET";
    this.requestUrl = props.url || "";
    this.successCallback = function () {};
    this.failCallback = function () {};
    this.sentBody = null;
};

Request.prototype.setHeaders = function (headers) {
    this.requestHeaders = headers || null;
    return this;
};

Request.prototype.success = function (cb) {
    cb = cb || function () {};
    this.successCallback = cb;
    return this;
};

Request.prototype.fail = function (cb) {
    cb = cb || function () {};
    this.failCallback = cb;
    return this;
};

Request.prototype.send = function ( ) {
    var self = this;

    try {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4) {
                if (
                    (xmlHttp.status < 400 || xmlHttp.status > 599) &&
                    xmlHttp.response != "Not found" &&
                    xmlHttp.status != 12029 &&
                    xmlHttp.status >= 100
                ) {
                    self.successCallback (xmlHttp.responseText);
                } else if (
                    xmlHttp.status == 400 &&
                    xmlHttp.responseText != "Not found" &&
                    xmlHttp.responseText != ""
                ) {
                    self.failCallback (xmlHttp.responseText);
                }
                else {
                    self.failCallback ("Not found or forbidden. Error status: " + xmlHttp.status + ".");
                }
            }
        };


        xmlHttp.open( self.requestType, self.requestUrl, true);

        xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8');
        xmlHttp.setRequestHeader('Cache-Control', 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
        xmlHttp.setRequestHeader('Pragma', 'no-cache');

        if (self.requestHeaders) {
            for ( var prop in self.requestHeaders) {
                if (self.requestHeaders.hasOwnProperty(prop)) {
                    xmlHttp.setRequestHeader(prop, self.requestHeaders[prop]);
                }
            }
        }
        xmlHttp.send(self.sentBody);
    }
    catch (err) {
        self.failCallback ("Connection failed. Details: " + err);
    }

};

Request.prototype.buildGetParams = function (requestObject) {
    var str = "";
    for (var key in requestObject) {
        if (!requestObject.hasOwnProperty (key) || requestObject[key] == "object") continue;
        if (str.length == 0) str += "?";
        else str += "&";

        str +=  key + "=" + requestObject[key];
    }
    return str;
};

Request.prototype.setData = function (requestData) {
    if (this.requestType == "POST" || this.requestType == "PUT") {
        this.sentBody = requestData;
    }
    else if (this.requestType == "GET") {
        this.requestUrl += this.buildGetParams (requestData);
    }
    return this;
};