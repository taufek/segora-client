'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('LoginCtrl', function ($scope, $http, $location, Settings, StatusService, FlashService, UserSessionService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.login = function(){

    	StatusService.start();

    	$http({
            method: 'POST',
            data: $scope.credential,
            url: Settings.backendHost + '/authenticate'
        }).
        success(function(data, status, headers, config) {
            UserSessionService.createSession($scope.credential.username, $scope.credential.password);
            $location.path('/');
        }).
        error(function(data, status, headers, config) {
            StatusService.stop();
            FlashService.setMessage('Unauthorized!', 'danger', true);
        });
    }
  });
