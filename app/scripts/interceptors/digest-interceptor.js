'use strict';

angular.module("segoraClientApp")
.config(function($httpProvider, $provide) {

        // var digestInterceptor = 
        //     function($location, $q) {

        //         var success = function(response) {
        //             return response;
        //         };

        //         var error = function(response) {

        //             if (response.status === 401 && response.config.url.indexOf(Settings.backendHost) != -1) {
        //                 console.log('digest error');
        //                 console.log(response);
        //                 console.log($httpProvider);

        //             }
        //             return $q.reject(response);
        //         };

        //         return function(promise) {
        //             return promise.then(success, error);
        //         };
        //     };

        // $httpProvider.responseInterceptors.push(digestInterceptor);

        // register the interceptor as a service
        //$q, $injector, md5, DigestHttp
        $provide.factory('digestInterceptor', function($q, $injector, md5, DigestHttp, Settings) {
            return {
                // optional method
                'request': function(config) {
                    // do something on success
                    // console.log(config);


                    // if (config.method == 'POST' || config.method == 'PUT') {

                    // if (config.url.indexOf(Settings.backendHost) != -1) {
                    //     console.log(config);
                    // }
                    return config;
                },

                // optional method
                'requestError': function(rejection) {
                    // do something on error
                    //          if (canRecover(rejection)) {
                    //            return responseOrNewPromise
                    //          }
                    // console.log(rejection);

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
                    //          if (canRecover(rejection)) {
                    //            return responseOrNewPromise
                    //          }
                    // console.log(rejection);
                    // console.log(rejection.headers('WWW-Authenticate'));
                    // console.log(rejection.config.headers.Authorization);


                    if(!rejection.config.headers.Authorization){

                        // window.counter++;

                        // console.log(window.counter);     
                        // console.log('resending request with authorization');

                        // console.log(rejection);

                        var path = rejection.config.url.substring(Settings.backendHost.length, rejection.config.url.length);
                        var dh = new DigestHttp($injector.get('$http'), md5);
                        dh.setUserName('james');
                        dh.setPassword('5f4dcc3b5aa765d61d8327deb882cf99');
                        var promise =  dh.respondRequest(rejection.config.method,
                            Settings.backendHost,
                            path,
                            rejection.config.data,                                 
                            rejection.headers,
                            function(data) {
                                console.log(data);
                                $q.resolve(data);
                                return data;
                            },
                            function(data){
                                console.log(data);
                                $q.reject(rejection);
                            }
                        );
                        // console.log(promise);
                        return promise;
                        

                    }
                    else{
                        return $q.reject(rejection);
                    }
                    // console.log($injector.get('$http'));
                    // console.log(rejection.config.url.indexOf(Settings.backendHost));
                    // console.log(Settings.backendHost.length);
                    // console.log(rejection.config.url.substring(Settings.backendHost.length, rejection.config.url.length));

                   

                    // return $q.reject(rejection);
                }
            };
        });

        
         $httpProvider.interceptors.push('digestInterceptor');


    }
);