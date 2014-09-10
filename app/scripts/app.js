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
  .config(function ($routeProvider) {
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
        controller: 'UsersListCtrl'
      })
      .when('/user/:userId', {
        templateUrl: 'views/user-detail.html',
        controller: 'UserDetailCtrl'
      })      
      .when('/user/:userId/address/:addressId', {
        templateUrl: 'views/user-address.html',
        controller: 'UserAddressDetailCtrl',
        resolve: {
          data: function($q, $route, UserService) {
            var deferred = $q.defer();
            var userId = $route.current.params.userId;
            var addressId = $route.current.params.addressId;
            var objects = {};

            // UserService.getById(userId, function(user){
            //   var objects.user;
            //   deferred.resolve(objects);
            // });

            return deferred.promise;
          }
            
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
