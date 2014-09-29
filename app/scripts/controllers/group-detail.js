'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:GroupDetailCtrl
 * @description
 * # GroupDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
    .controller('GroupDetailCtrl', 
        function($scope, $route, $location, $http, 
            GroupService, StatusService, FlashService,
            data) {
        
        $scope.groupId = data.groupId;
        $scope.group = data.group;
        $scope.users = data.users;
        $scope.admins = data.admins;
        $scope.selectedUsers = data.selectedUsers;
        $scope.selectedAdmins = data.selectedAdmins;

        if ($scope.groupId == 'new') {
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
                $location.path('/group');
            }
        };

        var updateUsersAndAdmins = function(){            

            var selectedUserIds = [];
            var selectedAdminIds = [];

            $scope.selectedUsers.forEach(function(selectedUser){
                selectedUserIds.push(selectedUser._id);
            });

            $scope.group.selectedUsers = selectedUserIds;                

            $scope.selectedAdmins.forEach(function(selectedAdmin){
                selectedAdminIds.push(selectedAdmin._id);
            });

            $scope.group.selectedAdmins = selectedAdminIds;
        }

        $scope.save = function() {
            if(!$scope.groupForm.$valid){
                FlashService.setMessage('Not valid', 'danger', true);
                return false;
            }

            StatusService.start();
            if ($scope.group._id) {

                updateUsersAndAdmins();

                GroupService.update($scope.group, function(o){
                    $scope.editMode = false;
                    StatusService.stop();
                    FlashService.setMessage('Updated.', 'success', true);
                });
            } else {
                updateUsersAndAdmins();
                
                GroupService.save($scope.group, function(o) {
                    $location.path('/group/'+o[0]._id);
                    FlashService.setMessage('Saved.', 'success');
                });
            }
        };



        $scope.remove = function() {

            StatusService.start();
            GroupService.remove($scope.group, function(){
                $location.path('/group');
                FlashService.setMessage('Removed.', 'success');
            });
        };

        $scope.chooseUser = function(userId){

            for(var i = $scope.users.length - 1; i >= 0; i--) {

                if($scope.users[i]._id === userId){
                    $scope.selectedUsers.push(angular.copy($scope.users[i]));
                    $scope.users.splice(i, 1);
                }
            }
        }        

        $scope.chooseAdmin = function(adminId){

            for(var i = $scope.admins.length - 1; i >= 0; i--) {

                if($scope.admins[i]._id === adminId){
                    $scope.selectedAdmins.push(angular.copy($scope.admins[i]));
                    $scope.admins.splice(i, 1);
                }
            }
        }

        $scope.removeUser = function(userId){

            for(var i = $scope.selectedUsers.length - 1; i >= 0; i--) {

                if($scope.selectedUsers[i]._id === userId){
                    $scope.users.push(angular.copy($scope.selectedUsers[i]));
                    $scope.selectedUsers.splice(i, 1);
                }
            }
        }

        $scope.removeAdmin = function(adminId){

            for(var i = $scope.selectedAdmins.length - 1; i >= 0; i--) {

                if($scope.selectedAdmins[i]._id === adminId){
                    $scope.admins.push(angular.copy($scope.selectedAdmins[i]));
                    $scope.selectedAdmins.splice(i, 1);
                }
            }
        }

    });