'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
    .controller('MainCtrl', function($scope, $location, UserSessionService) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.hasSession = function(){
        	return UserSessionService.hasSession();
        }
    });
