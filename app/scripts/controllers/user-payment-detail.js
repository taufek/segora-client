'use strict';

angular.module('segoraClientApp')
  .controller('UserPaymentDetailCtrl', function ($scope, $location, PaymentService, data) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.user = data.user;
    $scope.payment = data.payment;
    $scope.paymentId = data.paymentId;

    if($scope.paymentId == 'new'){
      $scope.editMode = true;
    }
    else{
      $scope.editMode = false;   
    }

    $scope.edit = function(){
      $scope.editMode = true;
    };

    $scope.done = function(){
      $scope.editMode = false;
    };      

    $scope.save = function(){
      if($scope.payment._id){
        $scope.payment._id = undefined;
        $scope.payment.$update({'paymentId':paymentId, 'test': true}, function(){
          $location.path('/user/'+$scope.user._id+'/payment');
        });
      }
      else{
        PaymentService.save($scope.payment, function(){
          $location.path('/user/'+$scope.user._id+'/payment'); 
        });        
      }      
    };

    $scope.remove = function(){
      $scope.payment.$remove({'paymentId':$scope.paymentId}, function(){
        $location.path('/user/'+$scope.user._id+'/payment');
      });
    };
  });
