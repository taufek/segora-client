'use strict';

angular.module('segoraClientApp')
.factory("CookieService", function($cookies) {
    return {
        get: function(key, fn) {
            return $cookies[key];
        },
        set: function(key, val) {
            return $cookies[key] = val ;
        },
        unset: function(key) {
            delete $cookies[key];
        }
    }
});