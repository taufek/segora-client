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
    function ($scope, $location, $timeout,
      CounterService, PaymentService, StatusService
      , FlashService, UserSessionService, UserService, AddressService
      , BankService, PaymentMethodService, Settings
      , data) {
    

    $scope.months = data.months;
    $scope.years = data.years;
    $scope.userId = data.userId;
    $scope.user = data.user;
    $scope.selectedYear = data.selectedYear;
    $scope.payments = data.payments;
    $scope.paymentsToProcess = [];
    $scope.currentUser = UserSessionService.getUser();

    BankService.list(function(banks){
      $scope.banks = banks;
    });

    PaymentMethodService.list(function(paymentMethods){
      $scope.paymentMethods = paymentMethods;
    });
    

    $scope.changeYear = function(){
    	$location.path('/user/'+$scope.userId+'/monthly_payment/'+$scope.selectedYear);
    }

    $scope.done = function(){
      return $location.path('/user/'+$scope.userId);
    }

    $scope.updatePayments = function(){
      $scope.months.forEach(function(month){

        if(month.checked && !month.disabled){
          $scope.paymentsToProcess.push(month);
        }
      });

      var count = $scope.paymentsToProcess.length;

      if(count > 0){
        $('#newPaymentModal').modal('show').on('shown.bs.modal', function () {
          
        });
      }
      else{
        FlashService.setMessage('Please select atleast one new payment.', 'danger', true);
      }

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

      if(count > 0){
        $scope.paymentsToProcess.forEach(function(month){
          PaymentService.createNew($scope.userId, function(payment){    


            payment.year = $scope.selectedYear;        
            payment.month = month.number;
            payment.amount = 80;
            payment.bank_reference = $scope.bankReferenceNumber;
            payment.payment_method_code = $scope.selectedPaymentMethodCode;
            payment.bank_code = $scope.selectedBankCode;



            CounterService.next('payment_' + payment.year + '_' + payment.month, function(counter){
              
              payment.creator_id = $scope.currentUser._id;
              payment.created_date = new Date().getTime();
              payment.reference_number = payment.year+$scope.padding(payment.month, '0', 2)+$scope.padding(counter.seq.toString(), '0', 3);
              
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
      else{
        FlashService.setMessage('Please select atleast one new payment.', 'danger', true);
        StatusService.stop();
      }

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

      if(month.payment.validation && month.payment.validation.validated_by){
        UserService.getById(month.payment.validation.validated_by, function(user){
          $scope.currentPayment.payment.validator = user;
        });
      }

      AddressService.getByUserId($scope.user._id, function(address){
        $scope.address = address;
      });

      BankService.getBankByCode($scope.currentPayment.payment.bank_code, function(bank){
        $scope.currentPayment.bank = bank;
      })

      PaymentMethodService.getPaymentMethodByCode($scope.currentPayment.payment.payment_method_code, function(paymentMethod){
        console.log(paymentMethod);
        $scope.currentPayment.paymentMethod = paymentMethod;
      })
    }

    $scope.getReceiptLink = function(paymentId){

      return Settings.backendHost + "/pdf_generator?url=" + (Settings.backendHost).replace('https','http') + "/payment_receipt/" + paymentId;
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

    $scope.getTitleForBankReference = function(){
      if($scope.hasAnyRoles(['admin','group_admin'])){
        return "Click to edit";
      }
      else{
        return "Reference #";
      }      
    }

    $scope.getStyleForBankReference = function(){if($scope.hasAnyRoles(['admin','group_admin'])){
        return "cursor:pointer";
      }
      else{
        return "";
      }
    }

    
    
    $timeout(function(){
      $('[data-toggle="tooltip"]').tooltip();
    }, 1000);

    $scope.isAdmin = function(){
      if($scope.hasAnyRoles(['system_admin','admin', 'group_admin'])){
        return true;
      }
      return false;
    }

    $scope.validate = function(payment){

      if($scope.isAdmin()){
        if(payment.validated){
          payment.validated = false;
          payment.validation.unvalidated_by = $scope.currentUser._id;
          payment.validation.unvalidated_date = new Date().toISOString();
        }
        else{
          payment.validated = true;    
          payment.validation = {}; 
          payment.validation.validated_by = $scope.currentUser._id;
          payment.validation.validated_date = new Date().toISOString();   
        }

        PaymentService.update(payment, function(){
          
        });
        $timeout(function(){
          $('[data-toggle="tooltip"]').tooltip('destroy');
          $('[data-toggle="tooltip"]').tooltip();
        }, 1000);
        
      }
      else{
        FlashService.setMessage('You do not have the privilege to validate a payment.', 'danger', true);
      }

    }

    $scope.getValidatedColor = function(payment){
      if(payment && payment.validated){
        return "green";
      }
      return "lightgrey";
    }

    $scope.getValidatedStatus = function(payment){
      if(payment && payment.validated){
        return "Validated";
      }
      return "Unvalidated";
    }
  });
