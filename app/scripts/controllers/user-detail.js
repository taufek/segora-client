'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserDetailCtrl
 * @description
 * # UserDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('UserDetailCtrl', function ($scope, $route, $location, $http, UserService, AddressService, data) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var userId = data.userId;
    $scope.user = data.user;
    $scope.address = data.address;

    $scope.showAddressButton = false;

    AddressService.getByUserId(userId, function(address){
      $scope.showAddressButton = true;
    });

    if(userId == 'new'){
      $scope.editMode = true;
      UserService.createNew(function(user){
        $scope.user = user;
      })
    }
    else{
      $scope.editMode = false;   

      UserService.getById(userId, function(user){
        $scope.user = user; 
      });   
    }

    window.scope = $scope;

    $scope.getAddressId = function(){
      if($scope.address !== null && $scope.address){
        return $scope.address._id;
      }
      return 'null';
    }

    $scope.edit = function(){
      $scope.editMode = true;
    };

    $scope.done = function(){
      $scope.editMode = false;
    };      

    $scope.save = function(){
      if($scope.user._id){
        $scope.user._id = undefined;
        $scope.user.$update({'userId':userId, 'test': true}, function(){
          $location.path('/user');
        });
      }
      else{
        UserService.save($scope.user, function(){
          $location.path('/user'); 
        });        
      }      
    };

    $scope.remove = function(){
      $scope.user.$remove({'userId':userId}, function(){
        $location.path('/user');
      });
    };

  });
