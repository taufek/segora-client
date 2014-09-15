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
                    data: ['$q', '$route', '$location', 'UserService', 'PaymentService', 'Settings',
                        function($q, $route, $location, UserService, PaymentService, Settings) {
                            var deferred = $q.defer();
                            var userId = $route.current.params.userId;
                            var objects = {};
                            var rowCount = Settings.rowCount;
                            var page = $location.search().page ? $location.search().page : 1;
                            objects.page = page;
                            objects.rowCount = rowCount;    

                            objects.currentYear = new Date().getFullYear();

                            UserService.getById(userId, function(user) {
                                objects.user = user;

                                PaymentService.getByUserId(userId, rowCount, page, function(payments) {
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
            .when('/user/:userId/monthly_payment/:year', {
                templateUrl: 'views/user-monthly-payment.html',
                controller: 'UserMonthlyPaymentCtrl',
                resolve: {
                    data: ['$q', '$route', 'UserService', 'PaymentService',
                        function($q, $route, UserService, PaymentService) {
                            var deferred = $q.defer();
                            var userId = $route.current.params.userId;
                            var year = $route.current.params.year;
                            var objects = {};
                            objects.userId = userId;
                            objects.selectedYear = year;

                            var currentYear = new Date().getFullYear();

                            objects.years = [
                                (currentYear-1).toString(), 
                                (currentYear).toString(), 
                                (currentYear+1).toString()];

                            objects.months =
                            [
                                {
                                    name : "January", 
                                    number : "1",
                                    code : "jan",
                                    checked : false
                                },
                                {
                                    name : "February",
                                    number : "2",
                                    code : "feb",
                                    checked : false
                                },
                                {
                                    name : "March",
                                    number : "3",
                                    code : "mar",
                                    checked : false
                                },
                                {
                                    name : "April",
                                    number : "4",
                                    code : "apr",
                                    checked : false
                                },
                                {
                                    name : "May",
                                    number : "5",
                                    code : "may",
                                    checked : false
                                },
                                {
                                    name : "Jun",
                                    number : "6",
                                    code : "jun",
                                    checked : false
                                },
                                {
                                    name : "July",
                                    number : "7",
                                    code : "jul",
                                    checked : false
                                },
                                {
                                    name : "August",
                                    number : "8",
                                    code : "aug",
                                    checked : false
                                },
                                {
                                    name : "September",
                                    number : "9",
                                    code : "sep",
                                    checked : false
                                },
                                {
                                    name : "October",
                                    number : "10",
                                    code : "oct",
                                    checked : false
                                },
                                {
                                    name : "November",
                                    number : "11",
                                    code : "nov",
                                    checked : false
                                },
                                {
                                    name : "December",
                                    number : "12",
                                    code : "dec",
                                    checked : false
                                }
                            ];



                            UserService.getById(userId, function(user) {
                                objects.user = user;

                                PaymentService.getByUserIdAndYear(userId, objects.selectedYear, function(payments){
                                    objects.payments = payments;
                                    var count = objects.payments.length * objects.months.length;
                                    var index = 0;

                                    if(count == 0){
                                        count = objects.months.length;
                                    }

                                    objects.months.forEach(function(month){
                                        month.checked = false;
                                        month.disabled = false;

                                        if(objects.payments && objects.payments.length > 0){                                            

                                            objects.payments.forEach(function(payment){
                                                if(!month.checked && payment.month == month.number){
                                                    month.checked = true;
                                                    month.disabled = true;
                                                }                                  

                                                index++;
                                                if(count == index){
                                                    deferred.resolve(objects);
                                                }    

                                            });      
                                        }
                                        else{
                                            index++;
                                            if(count == index){
                                                deferred.resolve(objects);
                                            }   
                                        }
                                    });   
                                });
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