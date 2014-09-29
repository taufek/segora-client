'use strict';

angular.module('segoraClientApp')
.factory("UserSessionService", function(SessionService, md5) {
    return {        
        hasSession: function(){
            if(SessionService.get('login')){
                return true;
            }
            return false;
        },
        createSession: function(username, password){
            SessionService.set('login', 'true');
            SessionService.set('username', username);
            SessionService.set('hash', md5.createHash(password));
        },
        addRoles: function(roles){
            SessionService.set('roles', JSON.stringify(roles));
        },
        addUser: function(user){
            SessionService.set('user', JSON.stringify(user));
        },
        removeSession: function(){
            SessionService.unset('login');
            SessionService.unset('username');
            SessionService.unset('hash');
            SessionService.unset('roles');
            SessionService.unset('user');
        },
        getHash: function(){
            return SessionService.get('hash');
        },
        getUsername: function(){
            return SessionService.get('username');
        },
        getUser: function(){
            return JSON.parse(SessionService.get('user'));
        },
        hasAnyRoles: function(arrayRoles) {
            var flag = false;
            var stringifyRoles = SessionService.get('roles');
            if (stringifyRoles != 'undefined') {
                var roles = JSON.parse(SessionService.get('roles'));
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