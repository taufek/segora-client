'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:PaymentsCtrl
 * @description
 * # PaymentsCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('PaymentsCtrl', function ($scope, PaymentService, StatusService, Settings) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.payments = [];
    $scope.createdFrom = Date.parse(new Date()).toString('dd-MM-yyyy');
    $scope.createdTo = Date.parse(new Date()).toString('dd-MM-yyyy');

    $scope.search = function(){
        StatusService.start();

    	PaymentService.searchWithUser(Date.parseExact($scope.createdFrom, 'dd-MM-yyyy'), Date.parseExact($scope.createdTo, 'dd-MM-yyyy'), function(payments){

    		$scope.payments = payments;
            StatusService.stop();
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

  });
