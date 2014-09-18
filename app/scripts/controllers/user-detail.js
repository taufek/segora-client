'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserDetailCtrl
 * @description
 * # UserDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
    .controller('UserDetailCtrl', function($scope, $route, $location, $http, UserService, AddressService, StatusService, FlashService, data) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.userId = data.userId;
        $scope.user = data.user;
        $scope.address = data.address;
        $scope.addressId = data.addressId;
        $scope.currentYear = new Date().getFullYear();

        if ($scope.userId == 'new') {
            $scope.editMode = true;
        } else {
            $scope.editMode = false;
        }

        $scope.getAddressId = function() {
            if ($scope.address !== null && $scope.address) {
                return $scope.address._id;
            }
            return 'null';
        }

        $scope.edit = function() {
            $scope.editMode = true;
        };

        $scope.done = function() {
            if($scope.editMode){
                $scope.editMode = false;
            }
            else{
                $location.path('/user');
            }
        };

        $scope.save = function() {
            StatusService.start();
            if ($scope.user._id) {
                UserService.update($scope.user, function(o){
                    $scope.editMode = false;
                    StatusService.stop();
                    FlashService.setMessage('Updated.', 'success', true);
                });
            } else {
                UserService.save($scope.user, function(o) {
                    $location.path('/user/'+o[0]._id);
                    FlashService.setMessage('Saved.', 'success');
                });
            }
        };



        $scope.remove = function() {

            StatusService.start();
            UserService.remove($scope.user, function(){
                $location.path('/user');
                FlashService.setMessage('Removed.', 'success');
            });
        };

    });
