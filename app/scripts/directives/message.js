'use strict';

/**
 * @ngdoc directive
 * @name segoraClientApp.directive:message
 * @description
 * # message
 */
angular.module('segoraClientApp')
  .directive('message', function () {
    return {
      templateUrl: 'views/templates/message.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.getAlertMessage = function(){
        	return scope.$root.alertMessage;
        }
      }
    };
  });
