'use strict';

/**
 * @ngdoc directive
 * @name segoraClientApp.directive:UserTab
 * @description
 * # UserTab
 */
angular.module('segoraClientApp')
  .directive('userTab', ['$location', 'AddressService', function ($location, AddressService) {
    return {
      restrict: 'E',
      templateUrl: 'views/templates/user-tab.html',
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


        scope.getUserLink = function(){

          if(scope.user._id !== undefined){
            return "#/user/"+scope.user._id;
          }
          else{
            return '#' + $location.path();
          }
        }

        scope.getAddressLink = function(){

          if(scope.user._id !== undefined){
            return "#/user/"+scope.user._id+"/address/"+scope.getAddressId();
          }
          else{
            return '#' + $location.path();
          }
        }

        scope.getPaymentLink = function(){
          if(scope.user._id !== undefined){
            return "#/user/"+scope.user._id+"/monthly_payment/"+scope.getCurrentYear();
          }
          else{
            return '#' + $location.path();
          }
        }

        scope.isActive = function(activeTab){
          var disabled = "";
          
          if(scope.user._id == undefined){
            disabled = "disabled";
          }          

          if(scope.activeTab == activeTab){
            return "active " + disabled;
          }
          return ""+disabled;
        }

        scope.isDisabled = function(){
          

        }
      }
    };
  }]);
