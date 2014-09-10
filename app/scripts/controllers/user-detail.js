'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserDetailCtrl
 * @description
 * # UserDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('UserDetailCtrl', function ($scope, $route, $location, $http, UserService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var userId = $route.current.params.userId;

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
          $location.path('/users');
        });
      }
      else{
        UserService.save($scope.user, function(){
          $location.path('/users'); 
        });        
      }      
    };

    $scope.remove = function(){
      $scope.user.$remove({'userId':userId}, function(){
        $location.path('/users');
      });
    };

  });
