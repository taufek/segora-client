'use strict';

/**
 * @ngdoc service
 * @name segoraClientApp.CounterService
 * @description
 * # CounterService
 * Service in the segoraClientApp.
 */
angular.module('segoraClientApp')
    .service('CounterService', function($resource, Settings) {
        var Counter = $resource(
            Settings.backendHost+'/next', {
                
            }, {
                'next': {
                    method: 'GET'
                }
            }
        );

        return {
            next: function(counterName, fn) {
                var that = this;
                Counter.next({
                    name : counterName
                }, function(counter) {
                    console.log(counter);

                    if(counter.seq == undefined){
                        console.log('no counter. recalling...');
                        that.next(counterName, fn);
                    }
                    else{
                        fn(counter);
                    }

                    
                });
            }
        }

    });
