'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:PaymentsCtrl
 * @description
 * # PaymentsCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('PaymentsCtrl', function ($scope, $timeout, PaymentService, StatusService, Settings, UserSessionService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.payments = [];
    $scope.createdFrom = Date.parse(new Date()).toString('dd-MM-yyyy');
    $scope.createdTo = Date.parse(new Date()).toString('dd-MM-yyyy');
    $scope.currentUser = UserSessionService.getUser();

    $scope.search = function(){
        StatusService.start();

    	PaymentService.searchWithUser(Date.parseExact($scope.createdFrom, 'dd-MM-yyyy').add(-1).day(), Date.parseExact($scope.createdTo, 'dd-MM-yyyy'), function(payments){

    		$scope.payments = payments;
            StatusService.stop();
            $timeout(function(){
              $('[data-toggle="tooltip"]').tooltip();
            }, 1000);
    	});
    }

    var datepicker = $('.datepicker').datepicker({format:'dd-mm-yyyy'});
    // datepicker.datepicker('.datepicker');
    datepicker.on('changeDate', function(ev) {
        console.log(ev);
        datepicker.datepicker('hide');
    });

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

    $scope.showPayment = function(payment){
        $scope.payment = angular.copy(payment);
    }

    $scope.getReceiptLink = function(paymentId){

      return Settings.backendHost + "/pdf_generator?url=" + Settings.backendHost + "/payment_receipt/" + paymentId;
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
