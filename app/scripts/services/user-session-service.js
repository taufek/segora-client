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
            SessionService.set('roles', roles);
        },
        removeSession: function(){
            SessionService.unset('login');
            SessionService.unset('username');
            SessionService.unset('hash');
            SessionService.unset('roles');
        },
        getHash: function(){
            return SessionService.get('hash');
        },
        getUsername: function(){
            return SessionService.get('username');
        }
    }
});