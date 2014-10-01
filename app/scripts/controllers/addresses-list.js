'use strict';

angular.module('segoraClientApp')
    .controller('AddressesListCtrl', function($scope, $location, UserService, data) {
        

        $scope.addresses = data.addresses;

        
    });
