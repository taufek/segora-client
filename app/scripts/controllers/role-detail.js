'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:RoleDetailCtrl
 * @description
 * # RoleDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
    .controller('RoleDetailCtrl', 
        function($scope, $route, $location, $http, 
            RoleService, StatusService, FlashService,
            data) {
        
        $scope.roleId = data.roleId;
        $scope.role = data.role;

        if ($scope.roleId == 'new') {
            $scope.editMode = true;
        } else {
            $scope.editMode = false;
        }


        $scope.edit = function() {
            $scope.editMode = true;
        };

        $scope.done = function() {
            if($scope.editMode){
                $scope.editMode = false;
            }
            else{
                $location.path('/role');
            }
        };

        $scope.save = function() {
            if(!$scope.roleForm.$valid){
                FlashService.setMessage('Not valid', 'danger', true);
                return false;
            }

            StatusService.start();
            if ($scope.role._id) {

                RoleService.update($scope.role, function(o){
                    $scope.editMode = false;
                    StatusService.stop();
                    FlashService.setMessage('Updated.', 'success', true);
                });
            } else {
                
                RoleService.save($scope.role, function(o) {
                    $location.path('/role/'+o[0]._id);
                    FlashService.setMessage('Saved.', 'success');
                });
            }
        };



        $scope.remove = function() {

            StatusService.start();
            RoleService.remove($scope.role, function(){
                $location.path('/role');
                FlashService.setMessage('Removed.', 'success');
            });
        };

    });