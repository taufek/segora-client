'use strict';

angular.module('segoraClientApp')
    .factory('PaymentMethodService', function($resource, $http, Settings) {
                
        var list = [
            {code: "cash-deposit", name:"Cash Deposit"},
            {code: "cheque-deposit", name:"Cheque Deposit"},
            {code: "ibg", name:"Inter-Bank Transfer"},
            {code: "cash", name:"Cash"}
        ];

        // Public API here
        return {
            
            list: function(fn) {

                fn(list);
            },
            getPaymentMethodByCode: function(code, fn) {
                list.forEach(function(item){
                    console.log(item.code + ' = ' + code);
                    if(item.code == code){
                        console.log('yes');
                        fn(item);
                    }
                });
            }
        };
    });
