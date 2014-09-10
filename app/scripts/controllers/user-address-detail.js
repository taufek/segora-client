'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserAddressDetailCtrl
 * @description
 * # UserAddressDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('UserAddressDetailCtrl', function ($scope, data) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.user = data.user;
    $scope.address = data.address;
    $scope.addressId = data.addressId;

    if($scope.addressId == 'null'){
      $scope.editMode = true;
      // UserService.createNew(function(user){
      //   $scope.user = user;
      // })
    }
    else{
      $scope.editMode = false;   

      // UserService.getById(userId, function(user){
      //   $scope.user = user; 
      // });   
    }


    $scope.edit = function(){
      $scope.editMode = true;
    };

    $scope.done = function(){
      $scope.editMode = false;
    };      

    $scope.save = function(){
      if($scope.address._id){
        $scope.user._id = undefined;
        $scope.user.$update({'userId':userId, 'test': true}, function(){
          $location.path('/user');
        });
      }
      else{
        // UserService.save($scope.user, function(){
        //   $location.path('/users'); 
        // });        
      }      
    };

    $scope.remove = function(){
      $scope.address.$remove({'addressId':addressId}, function(){
        $location.path('/address');
      });
    };

  });
