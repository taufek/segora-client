'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserPaymentsCtrl
 * @description
 * # UserPaymentsCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('UserPaymentsCtrl', function ($scope, data) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.payments = data.payments;
    $scope.user = data.user;
  });
