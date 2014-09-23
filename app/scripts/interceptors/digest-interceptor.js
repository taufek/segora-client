'use strict';

angular.module("segoraClientApp")
.config(function($httpProvider, $provide, Settings) {

        var digestInterceptor = 
            function($location, $q) {

                var success = function(response) {
                    return response;
                };

                var error = function(response) {

                    if (response.status === 401 && response.config.url.indexOf(Settings.backendHost) != -1) {
                        console.log('digest error');
                        console.log(response);
                        console.log($httpProvider);

                    }
                    return $q.reject(response);
                };

                return function(promise) {
                    return promise.then(success, error);
                };
            };

        // $httpProvider.responseInterceptors.push(digestInterceptor);


    }
);