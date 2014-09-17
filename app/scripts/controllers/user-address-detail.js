'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserAddressDetailCtrl
 * @description
 * # UserAddressDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
    .controller('UserAddressDetailCtrl', function($scope, $location, AddressService, StatusService, data) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.user = data.user;
        $scope.address = data.address;
        $scope.addressId = data.addressId;

        if ($scope.addressId == 'null') {
            $scope.editMode = true;
            AddressService.createNew($scope.user._id, function(address) {
                $scope.address = address;
            });
        } else {
            $scope.editMode = false;

            AddressService.getById($scope.addressId, function(address) {
                $scope.address = address;
            });
        }

        $scope.edit = function() {
            $scope.editMode = true;
        };

        
        $scope.done = function() {
            if($scope.editMode){
                $scope.editMode = false;
            }
            else{
                $location.path('/user/'+$scope.user._id);
            }
        };

        $scope.save = function() {
            StatusService.start();
            if ($scope.address._id) {
                AddressService.update($scope.address, function(o) {
                    $scope.editMode = false;
                    StatusService.stop();
                });
            } else {
                AddressService.save($scope.address, function(o) {
                    $location.path('/user/'+$scope.user._id+'/address/'+o[0]._id);
                });
            }
        };

        $scope.remove = function() {
            StatusService.start();
            AddressService.remove($scope.address, function(){
                $location.path('/user/'+$scope.user._id+'/address/null');
            });
        };

    });
