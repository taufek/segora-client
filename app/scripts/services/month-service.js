'use strict';

angular.module('segoraClientApp')
    .factory('MonthService', function($resource, $http, Settings) {
                
        var list = [
                {
                    name : "January", 
                    number : "1",
                    code : "jan"
                },
                {
                    name : "February",
                    number : "2",
                    code : "feb"
                },
                {
                    name : "March",
                    number : "3",
                    code : "mar"
                },
                {
                    name : "April",
                    number : "4",
                    code : "apr"
                },
                {
                    name : "May",
                    number : "5",
                    code : "may"
                },
                {
                    name : "Jun",
                    number : "6",
                    code : "jun"
                },
                {
                    name : "July",
                    number : "7",
                    code : "jul"
                },
                {
                    name : "August",
                    number : "8",
                    code : "aug"
                },
                {
                    name : "September",
                    number : "9",
                    code : "sep"
                },
                {
                    name : "October",
                    number : "10",
                    code : "oct"
                },
                {
                    name : "November",
                    number : "11",
                    code : "nov"
                },
                {
                    name : "December",
                    number : "12",
                    code : "dec"
                }
        ]               

        // Public API here
        return {
            
            list: function(fn) {

                fn(list);
            },
            getMonthByCode: function(code, fn) {
                list.forEach(function(item){
                    if(item.code == code){
                        fn(item);
                    }
                });
            },
            getMonthByNumber: function(number, fn) {
                list.forEach(function(item){
                    if(item.number == number){
                        fn(item);
                    }
                });
            }
        };
    });
