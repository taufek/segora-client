'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:RoleCtrl
 * @description
 * # RoleCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('RoleCtrl', function ($scope, data) {
    
    $scope.roles = data.roles;

  });
