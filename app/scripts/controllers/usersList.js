'use strict';

angular.module('segoraClientApp')
    .controller('UsersListCtrl', function($scope, data) {
        

        $scope.users = data.users;


    });
