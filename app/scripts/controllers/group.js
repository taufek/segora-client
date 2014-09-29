'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:GroupCtrl
 * @description
 * # GroupCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('GroupCtrl', function ($scope, data) {
    
    $scope.groups = data.groups;

  });
