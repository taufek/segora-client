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
        
        $scope.userId = data.userId;
        $scope.user = data.user;
        $scope.address = data.address;
        $scope.addressId = data.addressId;
        $scope.currentYear = new Date().getFullYear();

        var originalUsername = angular.copy($scope.user.user_name);

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
                $location.path('/home');
            }
        };


        var informUsernameNotAvailable = function(username){
            FlashService.setMessage('Username '+username+' is not available.', 'danger', true);
            StatusService.stop();
        };


        var checkUsername = function(okFn, notOkFn){
            if(originalUsername !== $scope.user.user_name){
                UserService.getByUsername($scope.user.user_name, function(user){
                    if(user == null){
                        okFn();
                    }
                    else{
                        notOkFn($scope.user.user_name);
                    }
                })
            }
            else{
                okFn();
            }
        }

        $scope.save = function() {
            if(!$scope.userForm.$valid){
                FlashService.setMessage('Not valid', 'danger', true);
                return false;
            }

            StatusService.start();
            if ($scope.user._id) {
                checkUsername(
                    function(){
                        UserService.update($scope.user, function(o){
                            $scope.editMode = false;
                            StatusService.stop();
                            FlashService.setMessage('Updated.', 'success', true);
                        });
                    },
                    informUsernameNotAvailable
                );
            } else {
                
                checkUsername(
                    function(){
                        UserService.save($scope.user, function(o) {
                            $location.path('/user/'+o[0]._id);
                            FlashService.setMessage('Saved.', 'success');
                        });
                    },
                    informUsernameNotAvailable
                );
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
