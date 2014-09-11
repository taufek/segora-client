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
          data: 
            ['$q', '$route', 'UserService',
            function($q, $route, UserService) {
            var deferred = $q.defer();
            var userId = $route.current.params.userId;
            var addressId = $route.current.params.addressId;
            var objects = {};

            // console.log(userId);

            UserService.getById(userId, function(user){
              objects.user = user;
              objects.addressId = addressId;
              objects.address = null;
              deferred.resolve(objects);
            });

            return deferred.promise;
          }]            
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
