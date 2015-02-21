var DigestHttpClass = function($http, md5) {
    this.userName = null;
    this.password = null;
    this.response = null;
    this.cnonce = 'acegi';
    this.nc = '00000001';
    this.authorizationHeader = "Authorization";
    this.wwwAuthenticationHeader = 'X-WWW-Authenticate';
    this.successFn = null;
    this.errorFn = null;
    this.$http = $http;
    this.md5 = md5;

    this.setUserName = function(userName) {
        this.userName = userName;
    };

    this.setPassword = function(password) {
        this.password = password;
    };

    this.call = function(method, host, uri, payload, headers, params) {

        if(typeof params === 'object'){
          params = this.object2Params(params);
        }
        else{
          params = encodeURI(decodeURI(params));
        }

        var finalUri = uri + ((typeof params !== "undefined" && params !== "undefined") ? ("?" + params) : "");

        this.setAuthenticateHeader(headers(this.wwwAuthenticationHeader));
        var nonce = this.getAuthenticateHeaderParam("nonce");
        var realm = this.getAuthenticateHeaderParam("realm");
        var qop = this.getAuthenticateHeaderParam("qop");
        var response = this.calculateResponse(method, finalUri, nonce, realm, qop);
        var authorizationHeaderValue = this.generateAuthorizationHeader(response, finalUri);
        headers[this.authorizationHeader] = authorizationHeaderValue;

        return this.$http({
            method: method,
            url: host + finalUri,
            data: payload,
            headers: headers
        });

    };

    this.params2Object = function(params){
      var newParams = {};
        if(params){
          parameters = params.split("&");
          parameters.forEach(function(parameter){
          keyValue = parameter.split("=");
          newParams[keyValue[0]] = keyValue[1];
        });
      }
      return newParams;
    }

    this.object2Params = function(obj, prefix){
      var str = [];
      for (var p in obj) {
        var k = prefix ? prefix + "[" + p + "]" : p,
            v = obj[k];
        str.push(angular.isObject(v) ? qs(v, k) : (k) + "=" + encodeURI(v).replace(/'/g,"%27"));
      }
      console.log(str.sort());
      return str.sort().join("&");
    }

    this.setAuthenticateHeader = function(headerValue) {
        this.authenticateHeaderValue = headerValue;
        this.authenticateHeaderParams = this.authenticateHeaderValue.split(",");
    }

    this.getAuthenticateHeaderParam = function(paramName) {
        var paramVal = null;
        $.each(this.authenticateHeaderParams, function(index, value) {
            if (value.indexOf(paramName) > 0) {
                paramVal = value.split(paramName + "=")[1];
                paramVal = paramVal.substring(1, paramVal.length - 1);
            }
        });
        return paramVal;
    }

    this.generateAuthorizationHeader = function(response, uri) {

        return this.authenticateHeaderValue + ', username="' + this.userName + '", uri="' +
            uri + '", response="' + response + '", nc=' +
            this.nc + ', cnonce="' + this.cnonce + '"';
    };

    this.calculateResponse = function(method, uri, nonce, realm, qop) {
        var a2 = method + ":" + uri;
        var a2Md5 = md5.createHash(a2);
        var a1Md5 = md5.createHash(this.userName + ":" + realm + ":" + this.password);
        var digest = a1Md5 + ":" + nonce + ":" + this.nc + ":" + this.cnonce + ":" + qop + ":" + a2Md5;
        return md5.createHash(digest);
    };
};

angular.module('segoraClientApp')
    .service("DigestHttp", [function(md5) {
        return DigestHttpClass;
    }
]);
