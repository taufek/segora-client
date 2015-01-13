'use strict';

angular.module('segoraClientApp')
    .factory('PaymentMethodService', function($resource, $http, Settings) {
                
        var list = [
            {code: "cash-deposit", name:"Cash Deposit"},
            {code: "cheque-deposit", name:"Cheque Deposit"},
            {code: "ibg", name:"Inter-Bank Transfer"},
            {code: "cash", name:"Cash"}
        ];

        var nonAdminList = [
            {code: "cash-deposit", name:"Cash Deposit"},
            {code: "cheque-deposit", name:"Cheque Deposit"},
            {code: "ibg", name:"Inter-Bank Transfer"}
        ];

        // Public API here
        return {
            
            list: function(fn) {

                fn(list);
            },
            listForNonAdmin: function(fn) {

                fn(nonAdminList);
            },
            getPaymentMethodByCode: function(code, fn) {
                list.forEach(function(item){
                    if(item.code == code){
                        fn(item);
                    }
                });
            }
        };
    });
