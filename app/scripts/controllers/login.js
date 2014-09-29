'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('LoginCtrl', function ($scope, $http, $location, 
    Settings, StatusService, FlashService, UserSessionService, UserService) {
    
    $scope.login = function(){

    	StatusService.start();

    	$http({
            method: 'POST',
            data: $scope.credential,
            url: Settings.backendHost + '/authenticate'
        }).
        success(function(data, status, headers, config) {

            UserSessionService.createSession(
                $scope.credential.username, 
                $scope.credential.password
                );

            UserService.getByUsername($scope.credential.username, function(user){
                UserSessionService.addRoles(user.userRoles);
                UserSessionService.addUser(user);
                $location.path('/');      
            });    


        }).
        error(function(data, status, headers, config) {
            StatusService.stop();
            FlashService.setMessage('Unauthorized!', 'danger', true);
        });
    }
  });
