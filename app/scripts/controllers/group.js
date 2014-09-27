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
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.groups = data.groups;

  });