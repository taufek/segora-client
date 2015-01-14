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
        'ngTouch',
        'angular-md5',
        'angularFileUpload',
        'ngCookies'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/home', {
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

                            UserService.getUsersWithAddress(function(users) {
                                objects.users = users;
                                deferred.resolve(objects);

                            });

                            return deferred.promise;
                        }
                    ]
                }
            })
            .when('/address', {
                templateUrl: 'views/addresses.html',
                controller: 'AddressesListCtrl',
                resolve: {
                    data: ['$q', '$route', 'AddressService',
                        function($q, $route, AddressService) {
                            var deferred = $q.defer();
                            var objects = {};

                            AddressService.list(function(addresses) {
                                objects.addresses = addresses;

                                objects.addresses.forEach(function(address){
                                    address.fullAddress = address.number + ' ' + address.street;
                                });
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
                    data: ['$q', '$route', 'UserService', 'AddressService', 'GroupService',
                        function($q, $route, UserService, AddressService, GroupService) {
                            var deferred = $q.defer();
                            var userId = $route.current.params.userId;
                            var objects = {};
                            objects.userId = userId;

                            // 

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
                    data: ['$q', '$route', 'UserService', 'AddressService',
                        function($q, $route, UserService, AddressService) {
                            var deferred = $q.defer();
                            var userId = $route.current.params.userId;
                            var addressId = $route.current.params.addressId;
                            var objects = {};


                            UserService.getById(userId, function(user) {
                                objects.user = user;
                                objects.addressId = addressId;

                                if(objects.addressId == 'null'){
                                    AddressService.createNew(userId, function(address) {
                                        objects.address = address;
                                        deferred.resolve(objects);
                                    });
                                }
                                else{
                                    AddressService.getById(objects.addressId, function(address){
                                        objects.address = address;
                                        deferred.resolve(objects);
                                    });
                                }
                                
                                
                            });

                            return deferred.promise;
                        }
                    ]
                }
            })
            .when('/user/:userId/credential/:credentialId', {
                templateUrl: 'views/user-credential.html',
                controller: 'UserCredentialDetailCtrl',
                resolve: {
                    data: ['$q', '$route', 'UserService',
                        function($q, $route, UserService) {
                            var deferred = $q.defer();
                            var userId = $route.current.params.userId;
                            var credentialId = $route.current.params.credentialId;
                            var objects = {};

                            // 

                            UserService.getById(userId, function(user) {
                                objects.user = user;
                                objects.credentialId = credentialId;
                                objects.credential = null;
                                deferred.resolve(objects);
                            });

                            return deferred.promise;
                        }
                    ]
                }
            })
            .when('/user/:userId/roles', {
                templateUrl: 'views/user-roles.html',
                controller: 'UserRoleDetailCtrl',
                resolve: {
                    data: ['$q', '$route', 'UserService', 'RoleService',
                        function($q, $route, UserService, RoleService) {
                            var deferred = $q.defer();
                            var userId = $route.current.params.userId;
                            var credentialId = $route.current.params.credentialId;
                            var objects = {};
                            objects.userRoles = [];

                            UserService.getById(userId, function(user) {
                                objects.user = user;
                                RoleService.list(function(roles){
                                    objects.roles = roles;

                                    if(objects.user.userRoles != undefined){
                                        var count = objects.user.userRoles.length;
                                        var index = 0;
                                        objects.user.userRoles.forEach(function(roleCode){

                                            objects.roles.forEach(function(role){
                                                if(role.code == roleCode){
                                                    objects.userRoles.push(role);
                                                    role.selected = true;
                                                    index++;

                                                    if(index == count){
                                                        deferred.resolve(objects);
                                                    }
                                                }
                                            });
                                        });
                                    }
                                    else{
                                        deferred.resolve(objects);
                                    }

                                    
                                })
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

                            // 

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
                                        month.payment = null;

                                        if(objects.payments && objects.payments.length > 0){                                            

                                            objects.payments.forEach(function(payment){
                                                if(!month.checked && payment.month == month.number){
                                                    month.checked = true;
                                                    month.disabled = true;
                                                    month.payment = payment;
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
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/group', {
                templateUrl: 'views/group.html',
                controller: 'GroupCtrl',
                resolve: {
                    data: ['$q', '$route', 'GroupService', 'UserSessionService',
                        function($q, $route, GroupService, UserSessionService) {
                            var deferred = $q.defer();
                            var objects = {};


                            var currentUser = UserSessionService.getUser();

                            GroupService.list(function(groups) {
                                objects.groups = [];
                                if(UserSessionService.hasAnyRoles(['admin'])){
                                    objects.groups = groups;
                                }
                                else{
                                    groups.forEach(function(group){
                           
                                        if(group.selectedAdmins && group.selectedAdmins.length > 0){
                                            group.selectedAdmins.forEach(function(selectedAdminId){
                                                if(currentUser._id == selectedAdminId){
                                                    objects.groups.push(group);
                                                }
                                            });
                                        }
                                    });
                                }
                                
                                deferred.resolve(objects);

                            });

                            return deferred.promise;
                        }
                    ]
                }
            })
            .when('/group/:groupId', {
                templateUrl: 'views/group-detail.html',
                controller: 'GroupDetailCtrl',
                resolve: {
                    data: ['$q', '$route', 'GroupService', 'UserService', 'AddressService',
                        function($q, $route, GroupService, UserService, AddressService) {
                            var deferred = $q.defer();
                            var groupId = $route.current.params.groupId;
                            var objects = {};
                            objects.groupId = groupId;
                            objects.selectedUsers = [];
                            objects.selectedAdmins = [];

                            var createUsers = function(){
                                UserService.getUsersWithAddress(function(users){
                                    objects.users = users;                                    

                                    objects.admins = angular.copy(users);

                                    if(objects.group.selectedUsers && objects.group.selectedUsers.length > 0){
                                        objects.group.selectedUsers.forEach(function(selectedUserId){

                                            for(var i = objects.users.length - 1; i >= 0; i--) {
                                                if(selectedUserId === objects.users[i]._id){
                                                    objects.selectedUsers.push(objects.users[i]);
                                                    objects.users.splice(i, 1);
                                                }
                                            }
                                        });
                                    }

                                    if(objects.group.selectedAdmins && objects.group.selectedAdmins.length > 0){
                                        objects.group.selectedAdmins.forEach(function(selectedAdminId){

                                            for(var i = objects.admins.length - 1; i >= 0; i--) {
                                                if(selectedAdminId === objects.admins[i]._id){
                                                    objects.selectedAdmins.push(objects.admins[i]);
                                                    objects.admins.splice(i, 1);
                                                }
                                            }
                                        });
                                    }

                                    deferred.resolve(objects);
                                });
                            }

                            if (groupId === 'new') {
                                GroupService.createNew(function(group) {
                                    objects.group = group;                                    
                                    createUsers();
                                });
                            } else {
                                GroupService.getById(groupId, function(group) {
                                    objects.group = group;
                                    createUsers();
                                });
                            }



                            return deferred.promise;
                        }
                    ]
                }
            })
            .when('/role', {
                templateUrl: 'views/role.html',
                controller: 'RoleCtrl',
                resolve: {
                    data: ['$q', '$route', 'RoleService',
                        function($q, $route, RoleService) {
                            var deferred = $q.defer();
                            var objects = {};

                            RoleService.list(function(roles) {
                                objects.roles = roles;
                                deferred.resolve(objects);

                            });

                            return deferred.promise;
                        }
                    ]
                }
            })
            .when('/role/:roleId', {
                templateUrl: 'views/role-detail.html',
                controller: 'RoleDetailCtrl',
                resolve: {
                    data: ['$q', '$route', 'RoleService', 'UserService',
                        function($q, $route, RoleService, UserService) {
                            var deferred = $q.defer();
                            var roleId = $route.current.params.roleId;
                            var objects = {};
                            objects.roleId = roleId;


                            if (roleId === 'new') {
                                RoleService.createNew(function(role) {
                                    objects.role = role;  
                                    deferred.resolve(objects); 
                                });
                            } else {
                                RoleService.getById(roleId, function(role) {
                                    objects.role = role;
                                    deferred.resolve(objects);
                                });
                            }

                            return deferred.promise;
                        }
                    ]
                }
            })
            .when('/user_upload', {
              templateUrl: 'views/user_upload.html',
              controller: 'UserUploadCtrl'
            })
            .when('/my_details', {
              templateUrl: 'views/my_details.html',
              controller: 'MyDetailsCtrl',
              resolve: {
                    data: ['$location', 'UserSessionService',
                        function($location, UserSessionService) {
                            
                            var user = UserSessionService.getUser();

                            $location.path('/user/'+user._id);
                        }
                    ]
              }
            })
            .when('/payments', {
              templateUrl: 'views/payments.html',
              controller: 'PaymentsCtrl'
            })
            .when('/user/:userId/payment_receipt/:paymentId', {
              templateUrl: 'views/payment_receipt.html',
              controller: 'PaymentReceiptCtrl',
              resolve: {
                data: ['$q', '$route', 'UserService', 'PaymentService',
                    function($q, $route, UserService, PaymentService){

                        var deferred = $q.defer();
                        var userId = $route.current.params.userId;
                        var paymentId = $route.current.params.paymentId;
                        var objects = {};

                        UserService.getUserWithAddress(userId, function(user){
                            objects.user = user;
                            PaymentService.getById(paymentId, function(payment){
                                objects.payment = payment;
                                deferred.resolve(objects); 
                            });
                        });

                        return deferred.promise;
                    }
                ]
              }
            })
            .otherwise({
                redirectTo: '/home'
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