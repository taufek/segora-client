'use strict';

angular.module('segoraClientApp')
  .controller('UsersListCtrl', function ($scope, userService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



    userService.list(function(users){

    	$scope.users = users;
    });

    
  });
