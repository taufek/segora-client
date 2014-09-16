'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserAddressDetailCtrl
 * @description
 * # UserAddressDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
    .controller('UserAddressDetailCtrl', function($scope, $location, AddressService, data) {
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
            if ($scope.address._id) {
                $scope.address._id = undefined;
                $scope.address.$update({
                    'addressId': addressId,
                    'test': true
                }, function() {
                    $location.path('/user');
                });
            } else {
                AddressService.save($scope.address, function() {
                    $location.path('/users');
                });
            }
        };

        $scope.remove = function() {
            $scope.address.$remove({
                'addressId': $scope.addressId
            }, function() {
                $location.path('/address');
            });
        };

    });
