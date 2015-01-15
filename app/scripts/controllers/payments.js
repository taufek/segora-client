'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:PaymentsCtrl
 * @description
 * # PaymentsCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('PaymentsCtrl', function ($scope, $timeout, PaymentService, StatusService
    , Settings, UserSessionService, UserService
    , BankService, PaymentMethodService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.payments = [];
    $scope.createdFrom = Date.parse(Date.today().add(-1).months()).toString('dd-MM-yyyy');
    $scope.createdTo = Date.parse(new Date()).toString('dd-MM-yyyy');
    $scope.validated = "any";
    $scope.currentUser = UserSessionService.getUser();

    $scope.search = function(){
        StatusService.start();

    	PaymentService.searchWithUser(
        Date.parseExact($scope.createdFrom, 'dd-MM-yyyy').add(-1).day(), 
        Date.parseExact($scope.createdTo, 'dd-MM-yyyy'),
        $scope.validated, 
        function(payments){

    		$scope.payments = payments;
            StatusService.stop();
            $timeout(function(){
              $('[data-toggle="tooltip"]').tooltip();
            }, 1000);
    	});
    }


    var createDatePicker = function(elementName, defaultDate){
      $('[name="'+elementName+'"]')
        .datetimepicker({defaultDate: defaultDate})
        .on("dp.change", function(e){
          $(e.target).data("DateTimePicker").hide();
      });
    };

    createDatePicker('created_from', $scope.createdFrom);
    createDatePicker('created_to', $scope.createdTo);

    $scope.months = [
    {'code':'0', 'name':''},
    {'code':'1', 'name':'January'},
    {'code':'2', 'name':'February'},
    {'code':'3', 'name':'March'},
    {'code':'4', 'name':'April'},
    {'code':'5', 'name':'May'},
    {'code':'6', 'name':'June'},
    {'code':'7', 'name':'July'},
    {'code':'8', 'name':'August'},
    {'code':'9', 'name':'September'},
    {'code':'10', 'name':'October'},
    {'code':'11', 'name':'November'},
    {'code':'12', 'name':'December'},
    ];

    $scope.validatedOptions = [
    {'code':'any', 'name':'Any'},
    {'code':'validated', 'name':'Validated'},
    {'code':'unvalidated', 'name':'Unvalidated'}
    ];

    $scope.showPayment = function(payment){
        $scope.payment = angular.copy(payment);

        if($scope.payment.validation && $scope.payment.validation.validated_by){
          UserService.getById($scope.payment.validation.validated_by, function(user){
            $scope.payment.validator = user;
            console.log($scope.payment.validator);
          });          
        }

        BankService.getBankByCode($scope.payment.bank_code, function(bank){
          $scope.payment.bank = bank;
        });

        PaymentMethodService.getPaymentMethodByCode($scope.payment.payment_method_code, function(paymentMethod){
          $scope.payment.paymentMethod = paymentMethod;
        });
    }

    $scope.getReceiptLink = function(paymentId){

      return Settings.backendHost + "/pdf_generator?url=" + (Settings.backendHost).replace('https','http') + "/payment_receipt/" + paymentId;
    }

    $scope.validate = function(payment){

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

      PaymentService.getById(payment._id, function(payment_object){


        payment_object.validated = payment.validated;
        payment_object.validation = payment.validation;

        PaymentService.update(payment_object, function(){

        });
        
      });

      $timeout(function(){
        $('[data-toggle="tooltip"]').tooltip('destroy');
        $('[data-toggle="tooltip"]').tooltip();
      }, 1000);
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
