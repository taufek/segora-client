'use strict';

/**
 * @ngdoc directive
 * @name segoraClientApp.directive:message
 * @description
 * # message
 */
angular.module('segoraClientApp')
  .directive('message', function (FlashService) {
    return {
      templateUrl: 'views/templates/message.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.flash = FlashService;

        scope.getAlertType = function(){

        	if(FlashService.getMessage() !== ''){
        		return 'alert alert-'+FlashService.getType();
        	}
        	return '';
        }
      }
    };
  });
