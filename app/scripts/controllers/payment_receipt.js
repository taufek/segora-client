'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:PaymentReceiptCtrl
 * @description
 * # PaymentReceiptCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('PaymentReceiptCtrl', function ($scope, data) {
    
    $scope.user = data.user;
    $scope.payment = data.payment;
  });
