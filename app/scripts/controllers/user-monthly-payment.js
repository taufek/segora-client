'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserMonthlyPaymentCtrl
 * @description
 * # UserMonthlyPaymentCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('UserMonthlyPaymentCtrl', function ($scope, $location, PaymentService, StatusService, FlashService, data) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.months = data.months;
    $scope.years = data.years;
    $scope.userId = data.userId;
    $scope.user = data.user;
    $scope.selectedYear = data.selectedYear;
    $scope.payments = data.payments;
    $scope.paymentsToProcess = [];

    $scope.changeYear = function(){
    	$location.path('/user/'+$scope.userId+'/monthly_payment/'+$scope.selectedYear);
    }

    $scope.done = function(){
      return $location.path('/user/'+$scope.userId);
    }

    $scope.save = function(){
      StatusService.start();

      $scope.months.forEach(function(month){

        if(month.checked && !month.disabled){
          $scope.paymentsToProcess.push(month);
        }
      });

      var count = $scope.paymentsToProcess.length;
      var index = 0;

      $scope.paymentsToProcess.forEach(function(month){
        PaymentService.createNew($scope.userId, function(payment){    
          payment.year = $scope.selectedYear;        
          payment.month = month.number;
          payment.amount = 80;
          PaymentService.save(payment, function(){
            index++;
            if(count == index){
              $location.search('refresh', new Date().getTime());
              $location.path('/user/'+$scope.userId+'/monthly_payment/'+$scope.selectedYear);
              FlashService.setMessage('Saved.', 'success');
            }
          });          
        });

      });

    }

    $scope.remove = function(paymentId){
      StatusService.start();  
      PaymentService.remove(paymentId, function(){
        $location.search('refresh', new Date().getTime());
        $location.path('/user/'+$scope.userId+'/monthly_payment/'+$scope.selectedYear);
        FlashService.setMessage('Removed.', 'success');
      });
    }
  });
