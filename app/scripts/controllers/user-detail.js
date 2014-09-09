'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserDetailCtrl
 * @description
 * # UserDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('UserDetailCtrl', function ($scope, $route, $location, userService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var userId = $route.current.params.userId;

    if(userId == 'new'){
      $scope.editMode = true;
      userService.createNew(function(user){
        $scope.user = user;
      })
    }
    else{
      $scope.editMode = false;   

      userService.getById(userId, function(user){
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
      console.log($scope.user);
      if($scope.user._id){
        $scope.user._id = undefined;
        $scope.user.$update({'userId':userId, 'test': true});
      }
      else{
        $scope.user.$save();
      }

      $location.path('/users');
    };

    $scope.remove = function(){
      console.log($scope.user);
      $scope.user.$remove({'userId':userId});
    };

  });
