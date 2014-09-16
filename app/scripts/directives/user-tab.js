'use strict';

/**
 * @ngdoc directive
 * @name segoraClientApp.directive:UserTab
 * @description
 * # UserTab
 */
angular.module('segoraClientApp')
  .directive('userTab', function (AddressService) {
    return {
      restrict: 'E',
      templateUrl: 'templates/user-tab.html',
      scope: {
      	user: '=',
      	activeTab: '@'
      },
      link: function(scope, element, attrs) {

      	AddressService.getByUserId(scope.user._id, function(address) {
            scope.address = address;
            scope.addressId = address ? address._id : null;
        });

        scope.getAddressId = function() {
            if (scope.address !== null && scope.address) {
                return scope.address._id;
            }
            return 'null';
        }

        scope.currentYear = new Date().getFullYear();

        scope.getCurrentYear = function(){
          return scope.currentYear;
        }

        scope.isActive = function(activeTab){
          if(scope.activeTab == activeTab){
            return "active";
          }
          return "";
        }
      }
    };
  });
