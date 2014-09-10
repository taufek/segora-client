'use strict';

angular.module('segoraClientApp')
  .controller('UsersListCtrl', function ($scope, UserService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    UserService.list(function(users){

    	$scope.users = users;
    });

    
  });
