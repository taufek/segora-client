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
        
        var currentYear = new Date().getFullYear();

        scope.isLogin = function(){
        	return UserSessionService.hasSession();
        }

        scope.logout = function(){
        	StatusService.start();
        	UserSessionService.removeSession(function(){
          	$location.search('logout_time', new Date().getTime());
          	$location.path('/home');            
          });
        }

        scope.userPaymentLink = function() {          
          return '#/user/'+UserSessionService.getUser()._id+'/monthly_payment/'+currentYear; 
        }

        
      

        
      }
    };
  });
