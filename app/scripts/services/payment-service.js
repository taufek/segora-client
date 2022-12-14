'use strict';

/**
 * @ngdoc service
 * @name segoraClientApp.PaymentService
 * @description
 * # PaymentService
 * Service in the segoraClientApp.
 */
angular.module('segoraClientApp')
    .service('PaymentService', function($resource, Settings, UserService, $http) {
        var Payment = $resource(
            Settings.backendHost+'/collections/payment/:paymentId', {
                paymentId: '@_id'
            }, {
                'save': {
                    method: 'POST',
                    isArray: true
                },
                'update': {
                    method: 'PUT'
                },
                'getByUserId': {
                    method: 'GET',
                    isArray: true
                },
                'search': {
                    method: 'GET',
                    isArray: true
                }
            }
        );

        return {
            getById: function(id, fn) {
                Payment.get({
                    paymentId: id
                }, function(payment) {
                    fn(payment);
                });
            },
            getByUserId: function(userId, limit, page, fn) {
                var paramLimit = limit;
                var paramPage = page;
                Payment.getByUserId({
                    userId: userId,
                    limit: paramLimit,
                    skip: ((paramPage*paramLimit)-(paramLimit))
                }, function(payments) {
                    fn(payments);
                });
            },
            search: function(dateFrom, dateTo, validated, fn) {
                $http.get(Settings.backendHost+'/search/payment?created_from='+ dateFrom.toString() + '&created_to=' + dateTo.toString() + "&validated="+validated).
                  success(function(data, status, headers, config) {
                    fn(data);
                  }).
                  error(function(data, status, headers, config) {
                    fn(null);
                  });
            },
            email: function(payment, fn) {
                var that = this;
                $http.post(Settings.backendHost+'/payment_receipt/' + payment._id + '/email').
                  success(function(data, status, headers, config) {
                    fn(data);
                    if(payment.email_sent == null || payment.email_sent == undefined){
                        payment.email_sent = [];
                    }
                    payment.email_sent.push({sent_date: new Date().toISOString()});
                    that.update(payment, function(){
                        console.log('update payment email info');
                    });

                  }).
                  error(function(data, status, headers, config) {
                    fn(null);
                  });
            },
            getByUserIdAndYear: function(userId, year, fn) {
                Payment.getByUserId({
                    userId: userId,
                    year: year,
                    limit: 12,
                    skip: 0
                }, function(payments) {
                    fn(payments);
                });
            },
            createNew: function(userId, fn) {
                var payment = new Payment();
                payment.userId = userId;
                fn(payment);
            },
            save: function(paymentData, fn) {
                var payment = angular.copy(paymentData);
                payment.year = parseInt(payment.year);
                payment.month = parseInt(payment.month);
                payment.amount = parseInt(payment.amount);
                payment.$save()
                    .then(function(o, res) {
                        
                        fn(o);
                    });
            },
            update: function(paymentData, fn) {
                var payment = angular.copy(paymentData);
                payment._id = undefined;
                payment.$update({
                    'paymentId': paymentData._id
                    })
                    .then(function(o, res) {
                        fn();
                    });
            },            
            remove: function(paymentId, fn) {

                this.getById(paymentId, function(payment){
                    payment.$remove()
                        .then(function(o, res) {
                            fn();
                        });                    
                });

            },
            searchWithUser: function(dateFrom, dateTo, validated, fn){
                this.search(dateFrom, dateTo, validated, function(payments){

                    if(payments && payments.length > 0){
                        UserService.getUsersWithAddress(function(users){
                            if(users && users.length > 0){
                                users.forEach(function(user){                                    
                                    payments.forEach(function(payment){
                                        if(payment.userId == user._id.toString()){
                                            payment.user = user;
                                        }

                                        if(payment.audit.created_by == user._id.toString()){
                                            payment.audit.created_by_user = user;
                                        }
                                    });                                    
                                });

                                fn(payments);
                            }
                            else{
                                fn(payments);
                            }
                        });                        
                    }
                    else{
                        fn(null);
                    }

                });
            }
        }
    });
