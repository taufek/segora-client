'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserCredentialDetailCtrl
 * @description
 * # UserCredentialDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
    .controller('UserCredentialDetailCtrl', function($scope, $location, CredentialService, StatusService, data) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.user = data.user;
        $scope.credential = data.credential;
        $scope.credentialId = data.credentialId;

        if ($scope.credentialId == 'null') {
            $scope.editMode = true;
            CredentialService.createNew($scope.user._id, function(credential) {
                $scope.credential = credential;
            });
        } else {
            $scope.editMode = false;

            CredentialService.getById($scope.credentialId, function(credential) {
                $scope.credential = credential;
                $scope.credential.password="";
                $scope.credential.confirmPassword="";
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

            if($scope.password !== $scope.confirmPassword){
                StatusService.stop();

                return;
            }


            if ($scope.credential._id) {
                CredentialService.update($scope.credential, function(o) {
                    $scope.editMode = false;
                    StatusService.stop();
                });
            } else {
                CredentialService.save($scope.credential, function(o) {
                    $location.path('/user/'+$scope.user._id+'/credential/'+o[0]._id);
                });
            }
        };

        $scope.remove = function() {
            StatusService.start();
            CredentialService.remove($scope.credential, function(){
                $location.path('/user/'+$scope.user._id+'/credential/null');
            });
        };

    });
