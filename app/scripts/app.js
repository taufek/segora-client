'use strict';

/**
 * @ngdoc overview
 * @name segoraClientApp
 * @description
 * # segoraClientApp
 *
 * Main module of the application.
 */
angular
    .module('segoraClientApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/user', {
                templateUrl: 'views/users.html',
                controller: 'UsersListCtrl',
                resolve: {
                    data: ['$q', '$route', 'UserService',
                        function($q, $route, UserService) {
                            var deferred = $q.defer();
                            var objects = {};

                            UserService.list(function(users) {
                                objects.users = users;
                                deferred.resolve(objects);

                            });

                            return deferred.promise;
                        }
                    ]
                }
            })
            .when('/user/:userId', {
                templateUrl: 'views/user-detail.html',
                controller: 'UserDetailCtrl',
                resolve: {
                    data: ['$q', '$route', 'UserService', 'AddressService',
                        function($q, $route, UserService, AddressService) {
                            var deferred = $q.defer();
                            var userId = $route.current.params.userId;
                            var objects = {};
                            objects.userId = userId;

                            // console.log(userId);

                            if (userId === 'new') {
                                UserService.createNew(function(user) {
                                    objects.user = user;
                                    objects.address = null;
                                    objects.addressId = null;
                                    deferred.resolve(objects);
                                });
                            } else {
                                UserService.getById(userId, function(user) {
                                    objects.user = user;
                                    AddressService.getByUserId(userId, function(address) {
                                        objects.address = address;
                                        objects.addressId = address ? address._id : null;
                                        deferred.resolve(objects);
                                    });
                                });
                            }

                            return deferred.promise;
                        }
                    ]
                }
            })
            .when('/user/:userId/address/:addressId', {
                templateUrl: 'views/user-address.html',
                controller: 'UserAddressDetailCtrl',
                resolve: {
                    data: ['$q', '$route', 'UserService',
                        function($q, $route, UserService) {
                            var deferred = $q.defer();
                            var userId = $route.current.params.userId;
                            var addressId = $route.current.params.addressId;
                            var objects = {};

                            // console.log(userId);

                            UserService.getById(userId, function(user) {
                                objects.user = user;
                                objects.addressId = addressId;
                                objects.address = null;
                                deferred.resolve(objects);
                            });

                            return deferred.promise;
                        }
                    ]
                }
            })
            .when('/user/:userId/payment', {
                templateUrl: 'views/user-payments.html',
                controller: 'UserPaymentsCtrl',
                resolve: {
                    data: ['$q', '$route', 'UserService', 'PaymentService',
                        function($q, $route, UserService, PaymentService) {
                            var deferred = $q.defer();
                            var userId = $route.current.params.userId;
                            var objects = {};

                            // console.log(userId);

                            UserService.getById(userId, function(user) {
                                objects.user = user;

                                PaymentService.getByUserId(userId, function(payments) {
                                    objects.payments = payments;
                                    deferred.resolve(objects);
                                });

                            });

                            return deferred.promise;
                        }
                    ]
                }
            })
            .when('/user/:userId/payment/:paymentId', {
                templateUrl: 'views/user-payment.html',
                controller: 'UserPaymentDetailCtrl',
                resolve: {
                    data: ['$q', '$route', 'UserService', 'PaymentService',
                        function($q, $route, UserService, PaymentService) {
                            var deferred = $q.defer();
                            var userId = $route.current.params.userId;
                            var paymentId = $route.current.params.paymentId;
                            var objects = {};
                            objects.paymentId = paymentId;
                            objects.userId = userId;

                            // console.log(userId);

                            UserService.getById(userId, function(user) {
                                objects.user = user;

                                if (paymentId === 'new') {
                                    PaymentService.createNew(userId, function(payment) {
                                        objects.payment = payment;
                                        deferred.resolve(objects);
                                    });
                                } else {
                                    PaymentService.getById(paymentId, function(payment) {
                                        objects.payment = payment;
                                        deferred.resolve(objects);
                                    });
                                }


                            });

                            return deferred.promise;
                        }
                    ]
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    });



angular.module("segoraClientApp")
  .run(function($rootScope, $location, StatusService) {

    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        StatusService.start();
    });
    $rootScope.$on("$routeChangeSuccess", function(event, current, previous) {
        StatusService.default();
    });
    $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
        StatusService.error("Failed to change routes :(");
    });

    StatusService.default();
});