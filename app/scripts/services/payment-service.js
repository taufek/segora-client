'use strict';

/**
 * @ngdoc service
 * @name segoraClientApp.PaymentService
 * @description
 * # PaymentService
 * Service in the segoraClientApp.
 */
angular.module('segoraClientApp')
    .service('PaymentService', function($resource, Settings) {
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
                payment.$save()
                    .then(function(o, res) {
                        console.log(o);
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

            }
        }
    });
