'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserCredentialDetailCtrl
 * @description
 * # UserCredentialDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
    .controller('UserCredentialDetailCtrl', function($scope, $location, CredentialService, StatusService, FlashService, UserSessionService, data) {
        

        $scope.user = data.user;
        $scope.credential = data.credential;
        $scope.credentialId = data.credentialId;
        $scope.currentUser = UserSessionService.getUser();

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

            if(!$scope.credentialForm.$valid){
                FlashService.setMessage('Not valid', 'danger', true);
                return false;
            }
            
            StatusService.start();

            if($scope.credential.password !== $scope.credential.confirmPassword){
                StatusService.stop("");
                FlashService.setMessage('Password does not match!', 'danger', true);
                return false;
            }


            if ($scope.credential._id) {
                CredentialService.update($scope.credential, function(o) {
                    $scope.editMode = false;
                    if($scope.user._id === $scope.currentUser._id){
                        $scope.createSession($scope.user.user_name, $scope.credential.password);                        
                    }
                    StatusService.stop();
                    FlashService.setMessage('Updated.', 'success', true);
                });
            } else {
                CredentialService.save($scope.credential, function(o) {
                    if($scope.user._id === $scope.currentUser._id){
                        $scope.createSession($scope.user.user_name, $scope.credential.password);                        
                    }
                    $location.path('/user/'+$scope.user._id+'/credential/'+o[0]._id);
                    FlashService.setMessage('Saved.', 'success');
                });
            }
        };

        $scope.createSession = function(username, password){
            UserSessionService.createSession(username, password);
        }

        $scope.remove = function() {
            StatusService.start();
            CredentialService.remove($scope.credential, function(){
                $location.path('/user/'+$scope.user._id+'/credential/null');
                FlashService.setMessage('Removed.', 'success');
            });
        };

    });
