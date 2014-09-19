'use strict';

/**
 * @ngdoc directive
 * @name segoraClientApp.directive:mainMenu
 * @description
 * # mainMenu
 */
angular.module('segoraClientApp')
  .directive('mainMenu', function ($location, UserSessionService, StatusService) {
    return {
      templateUrl: 'views/templates/main-menu.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        
        scope.isLogin = function(){
        	return UserSessionService.hasSession();
        }

        scope.logout = function(){
        	StatusService.start();
        	UserSessionService.removeSession();
        	$location.search('logout_time', new Date().getTime());
        	$location.path('/home');
        }
      }
    };
  });
