'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserMonthlyPaymentCtrl
 * @description
 * # UserMonthlyPaymentCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('UserMonthlyPaymentCtrl', function ($scope, $location, data) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.months = data.months;
    $scope.years = data.years;
    $scope.userId = data.userId;
    $scope.currentYear = data.curr
    $scope.currentYear = data.currentYear;

    $scope.changeYear = function(){
    	console.log($scope.currentYear);
    	$location.path('/user/'+$scope.userId+'/monthly_payment/'+$scope.currentYear);
    }
  });
