'use strict';

angular.module('segoraClientApp')
.factory("SessionService", function() {
    return {
        get: function(key) {
            return sessionStorage.getItem(key);
        },
        set: function(key, val) {
            return sessionStorage.setItem(key, val);
        },
        unset: function(key) {
            return sessionStorage.removeItem(key);
        },
        hasSession: function(key){
            if(this.get('login')){
                return true;
            }
            return false;
        }
    }
});