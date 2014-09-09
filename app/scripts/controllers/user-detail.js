'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserDetailCtrl
 * @description
 * # UserDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('UserDetailCtrl', function ($scope, $route, userService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.editMode = false;

    $scope.edit = function(){
      $scope.editMode = true;
    };

    $scope.done = function(){
      $scope.editMode = false;
    };

    var userId = $route.current.params.userId;

    userService.getById(userId, function(user){
    	$scope.user = user; 
    });

    $scope.save = function(){
      console.log($scope.user);
      $scope.user._id = undefined;
      $scope.user.$update({'userId':userId, 'test': true});
    };

  });
