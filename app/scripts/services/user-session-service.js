'use strict';

angular.module('segoraClientApp')
.factory("UserSessionService", function(SessionService) {
    return {        
        hasSession: function(){
            if(SessionService.get('login')){
                return true;
            }
            return false;
        },
        createSession: function(){
            SessionService.set('login', 'true');
        },
        removeSession: function(){
            SessionService.unset('login');
        }
    }
});