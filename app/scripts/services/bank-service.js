'use strict';

angular.module('segoraClientApp')
    .factory('BankService', function($resource, $http, Settings) {

        var banks = [
            {code: "affin", name:"Affin Bank"},
            {code: "alliance", name:"Alliance Bank"},
            {code: "am", name:"AmBank"},
            {code: "alrajhi", name:"Al Rajhi Bank"}
        ];
        // Public API here
        return {
            
            list: function(fn) {
                
                

                fn(banks);
            },
            getBankByCode: function(code, fn) {
                banks.forEach(function(bank){
                    if(bank.code == code){
                        fn(bank);
                    }
                });
            }
        };
    });
