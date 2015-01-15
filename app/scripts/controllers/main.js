'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
    .controller('MainCtrl', function($scope, $location, UserSessionService, CredentialService, FlashService) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.hasSession = function(){
        	return UserSessionService.hasSession();
        }

        if($scope.hasSession()){

            var hash = UserSessionService.getHash();

            if (hash == '10073a2472e3d3e7f26a8a37573fb678'){

                CredentialService.getByUserId(UserSessionService.getUser()._id, function(credential){
                    FlashService.setMessage('Please change your default password.', 'danger');
                    $location.path('/user/'+UserSessionService.getUser()._id+'/credential/'+credential._id);                 
                });
            }
            else{
                var currentYear = new Date().getFullYear();
                $location.path('/user/'+UserSessionService.getUser()._id+'/monthly_payment/'+currentYear);                 
            }
        }
    });
