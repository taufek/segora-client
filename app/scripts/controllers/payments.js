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
    $scope.createdFrom = Date.parse(new Date()).toString('dd-MM-yyyy');
    $scope.createdTo = Date.parse(new Date()).toString('dd-MM-yyyy');

    $scope.search = function(){

    	PaymentService.searchWithUser(Date.parseExact($scope.createdFrom, 'dd-MM-yyyy'), Date.parseExact($scope.createdTo, 'dd-MM-yyyy'), function(payments){

    		$scope.payments = payments;
    	});
    }

    $('.datepicker').datepicker({format:'dd-mm-yyyy'});


  });
