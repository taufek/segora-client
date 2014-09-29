'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserRoleDetailCtrl
 * @description
 * # UserRoleDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
    .controller('UserRoleDetailCtrl', function($scope, $location, RoleService, StatusService, FlashService, data) {
        

        $scope.user = data.user;
        $scope.roles = data.roles;

        if ($scope.user.roles == undefined) {
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
                $location.path('/user/'+$scope.user._id);
            }
        };

        $scope.save = function() {

            if(!$scope.userRoleForm.$valid){
                FlashService.setMessage('Not valid', 'danger', true);
                return false;
            }
            
            StatusService.start();

            UserService.update($scope.user, function(o) {
                $scope.editMode = false;
                StatusService.stop();
                FlashService.setMessage('Updated.', 'success', true);
            });
        };

        
    });
