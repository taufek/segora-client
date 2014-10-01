'use strict';

angular.module('segoraClientApp')
    .controller('AddressesListCtrl', function($scope, data) {
        

        $scope.addresses = data.addresses;


    });
