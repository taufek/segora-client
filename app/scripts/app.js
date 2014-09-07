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
        controller: 'usersListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
