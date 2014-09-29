'use strict';

/**
 * @ngdoc directive
 * @name segoraClientApp.directive:UserTab
 * @description
 * # UserTab
 */
angular.module('segoraClientApp')
  .directive('userTab', ['$location', 'AddressService', 'CredentialService', 
    function ($location, AddressService, CredentialService) {
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

        CredentialService.getByUserId(scope.user._id, function(credential) {
            scope.credential = credential;
            scope.credentialId = credential ? credential._id : null;
        });

        scope.getAddressId = function() {
            if (scope.address !== null && scope.address) {
                return scope.address._id;
            }
            return 'null';
        }

        scope.getCredentialId = function() {
            if (scope.credential !== null && scope.credential) {
                return scope.credential._id;
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

        scope.getRolesLink = function(){

          if(scope.user._id !== undefined){
            return "#/user/"+scope.user._id+"/roles";
          }
          else{
            return '#' + $location.path();
          }
        }

        scope.getCredentialLink = function(){

          if(scope.user._id !== undefined){
            return "#/user/"+scope.user._id+"/credential/"+scope.getCredentialId();
          }
          else{
            return '#' + $location.path();
          }
        }

        scope.getPaymentLink = function(){
          if(scope.user._id !== undefined && scope.address !== undefined){
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

          if(activeTab == 'payments' && scope.address == undefined){
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
