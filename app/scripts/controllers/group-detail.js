'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:GroupDetailCtrl
 * @description
 * # GroupDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
    .controller('GroupDetailCtrl', function($scope, $route, $location, $http, GroupService, StatusService, FlashService, data) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.groupId = data.groupId;
        $scope.group = data.group;

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

        $scope.save = function() {
            if(!$scope.groupForm.$valid){
                FlashService.setMessage('Not valid', 'danger', true);
                return false;
            }

            StatusService.start();
            if ($scope.group._id) {
                GroupService.update($scope.group, function(o){
                    $scope.editMode = false;
                    StatusService.stop();
                    FlashService.setMessage('Updated.', 'success', true);
                });
            } else {
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

    });