'use strict';

angular.module('segoraClientApp')
.factory("UserSessionService", function(CookieService, md5) {
    return {        
        hasSession: function(){
            if(CookieService.get('login')){
                return true;
            }
            else{
                return false;    
            }            
        },
        createSession: function(username, password){
            CookieService.set('login', 'true');
            CookieService.set('username', username);
            CookieService.set('hash', md5.createHash(password));
        },
        addRoles: function(roles){
            CookieService.set('roles', JSON.stringify(roles));
        },
        addUser: function(user){
            CookieService.set('user', JSON.stringify(user));
        },
        removeSession: function(fn){
            CookieService.unset('login');
            CookieService.unset('username');
            CookieService.unset('hash');
            CookieService.unset('roles');
            CookieService.unset('user');
            fn();
        },
        getHash: function(){
            return CookieService.get('hash');
        },
        getUsername: function(){
            return CookieService.get('username');
        },
        getUser: function(){
            return JSON.parse(CookieService.get('user'));
        },
        hasAnyRoles: function(arrayRoles) {
            var flag = false;
            var stringifyRoles = CookieService.get('roles');
            if (stringifyRoles != undefined && stringifyRoles != "undefined") {
                var roles = JSON.parse(CookieService.get('roles'));
                if (roles) {
                    roles.forEach(function(role) {
                        for (var i = 0; i < arrayRoles.length; i++) {
                            if (arrayRoles[i] == role) {
                                flag = true;
                            }
                        }
                    });
                }
            }

            return flag;
        }
    }
});