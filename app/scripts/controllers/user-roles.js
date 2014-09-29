'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserRoleDetailCtrl
 * @description
 * # UserRoleDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
    .controller('UserRoleDetailCtrl', function($scope, $location, UserService, RoleService, StatusService, FlashService, data) {
        

        $scope.user = data.user;
        $scope.roles = data.roles;
        $scope.userRoles = data.userRoles;

        $scope.editMode = false;  

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

            if(!$scope.userRolesForm.$valid){
                FlashService.setMessage('Not valid', 'danger', true);
                return false;
            }
            
            StatusService.start();
            $scope.user.userRoles = [];
            $scope.userRoles = []

            $scope.roles.forEach(function(role){
                if(role.selected){
                    $scope.user.userRoles.push(role.code);
                    $scope.userRoles.push(role);
                }
            });

            UserService.update($scope.user, function(o) {
                $scope.editMode = false;
                StatusService.stop();
                FlashService.setMessage('Updated.', 'success', true);
            });
// StatusService.stop();
        };

        $scope.chooseRole = function(code){

            $scope.roles.forEach(function(role){
                if(code == role.code){
                    if(!role.selected){
                        role.selected = true;                        
                    }
                    else{
                        delete role.selected;
                    }
                }
            })
        }
        
    });
