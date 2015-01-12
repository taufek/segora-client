'use strict';

angular.module('segoraClientApp')
    .factory('BankService', function($resource, $http, Settings) {

        var banks = [
            {code: "affin", name:"Affin Bank"},
            {code: "alliance", name:"Alliance Bank"},
            {code: "am", name:"AmBank"},
            {code: "alrajhi", name:"Al Rajhi Bank"},
            {code: "islam", name:"Bank Islam"},
            {code: "muamalat", name:"Bank Muamalat"},
            {code: "cimb", name:"CIMB Bank"},
            {code: "citi", name:"Citibank"},
            {code: "kfh", name:"Kuwait Finance House"},
            {code: "hsbc", name:"HSBC Bank"},
            {code: "hongleong", name:"Hong Leong Bank"},
            {code: "maybank", name:"Maybank"},
            {code: "ocbc", name:"OCBC Bank"},
            {code: "public", name:"Public Bank"},
            {code: "rhb", name:"RHB Bank"},
            {code: "standchart", name:"Standard Chartered"},
            {code: "others", name:"Others"}
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
