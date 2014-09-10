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
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersListCtrl'
      })
      .when('/users/:userId', {
        templateUrl: 'views/user-detail.html',
        controller: 'UserDetailCtrl'
      })      
      .when('/users/:userId/address/:addressId', {
        templateUrl: 'views/user-address.html',
        controller: 'UserAddressDetailCtrl',
        resolve: {
          data: function($q, $route) {
            var deferred = $q.defer();
            var userId = $route.current.params.userId;
            var addressId = $route.current.params.addressId;
            var objects = {};

            deferred.resolve(objects);

            return deferred.promise;
          }
            
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
