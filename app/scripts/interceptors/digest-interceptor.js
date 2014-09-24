'use strict';

angular.module("segoraClientApp")
.config(function($httpProvider, $provide) {

        // register the interceptor as a service
        $provide.factory('digestInterceptor', ['$q', '$injector', 'md5', 'DigestHttp', 'Settings', 'UserSessionService',
            function($q, $injector, md5, DigestHttp, Settings, UserSessionService) {
            return {
                // optional method
                'request': function(config) {
                    // do something on success
                    // console.log(config);
                    return config;
                },

                // optional method
                'requestError': function(rejection) {                 

                    return $q.reject(rejection);
                },

                // optional method
                'response': function(response) {
                    // do something on success
                    // console.log(response);
                    return response;
                },

                // optional method
                'responseError': function(rejection) {
                    // do something on error
                
                    if(!rejection.config.headers.Authorization){

                        var path = rejection.config.url.substring(Settings.backendHost.length, rejection.config.url.length);
                        var dh = new DigestHttp($injector.get('$http'), md5);
                        dh.setUserName(UserSessionService.getUsername());
                        dh.setPassword(UserSessionService.getHash());
                        var promise =  dh.call(rejection.config.method,
                            Settings.backendHost,
                            path,
                            rejection.config.data,                                 
                            rejection.headers
                        );
                        
                        return promise;          
                    }
                    else{
                        return $q.reject(rejection);
                    }
                    
                }
            };
        }]);

        
        $httpProvider.interceptors.push('digestInterceptor');


    }
);