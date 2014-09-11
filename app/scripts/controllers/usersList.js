'use strict';

angular.module('segoraClientApp')
  .controller('UsersListCtrl', function ($scope, data) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.users = data.users;

    
  });
