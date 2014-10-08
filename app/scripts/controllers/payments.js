'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:PaymentsCtrl
 * @description
 * # PaymentsCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('PaymentsCtrl', function ($scope, PaymentService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.payments = [];

    $scope.search = function(){

    	PaymentService.searchWithUser($scope.search.year, $scope.search.month.code, function(payments){

    		$scope.payments = payments;
    	});
    }
  });
