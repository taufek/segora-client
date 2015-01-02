'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserMonthlyPaymentCtrl
 * @description
 * # UserMonthlyPaymentCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('UserMonthlyPaymentCtrl', 
    function ($scope, $location, 
      CounterService, PaymentService, StatusService
      , FlashService, UserSessionService, UserService, AddressService
      , Settings
      , data) {
    

    $scope.months = data.months;
    $scope.years = data.years;
    $scope.userId = data.userId;
    $scope.user = data.user;
    $scope.selectedYear = data.selectedYear;
    $scope.payments = data.payments;
    $scope.paymentsToProcess = [];
    $scope.currentUser = UserSessionService.getUser();
    

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
          payment.bank_reference = month.bank_reference;

          CounterService.next('payment_' + payment.year + '_' + payment.month, function(counter){
            
            payment.creator_id = $scope.currentUser._id;
            payment.created_date = new Date().getTime();
            payment.referenceNumber = payment.year+$scope.padding(payment.month, '0', 2)+$scope.padding(counter.seq.toString(), '0', 3);
            
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

      });

    }

    $scope.padding = function(value, padString, length) {
        var str = value;
        while (str.length < length)
            str = padString + str;
        return str;
    }

    $scope.remove = function(paymentId){
      StatusService.start();  
      PaymentService.remove(paymentId, function(){
        $location.search('refresh', new Date().getTime());
        $location.path('/user/'+$scope.userId+'/monthly_payment/'+$scope.selectedYear);
        FlashService.setMessage('Removed.', 'success');
      });
    }

    $scope.showPayment = function(month){
      $scope.currentPayment = month;

      UserService.getById(month.payment.audit.created_by, function(user){
        $scope.currentPayment.payment.creator = user;
      });

      AddressService.getByUserId($scope.user._id, function(address){
        $scope.address = address;
      })
    }

    $scope.getReceiptLink = function(paymentId){

      return Settings.backendHost + "/pdf_generator?url=" + Settings.backendHost + "/payment_receipt/" + paymentId;
    }

    $scope.editBankReference = function(month){

      if($scope.hasAnyRoles(['admin','group_admin'])){
        month.temp = {};
        month.temp.icon = "glyphicon-ok";
        month.temp.bank_reference = month.payment.bank_reference;
        month.editBankReference = true;        
      }
    }

    $scope.cancelEditingBankReference = function(month) {
      delete month.payment.temp;
      month.editBankReference = false;
    }

    $scope.saveEditingBankReference = function(month) {
      month.temp.icon = "glyphicon-refresh gly-spin";
      month.payment.bank_reference = month.temp.bank_reference;
      PaymentService.update(month.payment, function(){
        delete month.temp;        
        month.editBankReference = false;
      });

      
    }
  });
