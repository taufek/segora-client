'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserPaymentsCtrl
 * @description
 * # UserPaymentsCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
    .controller('UserPaymentsCtrl', function($scope, $location, data) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $scope.user = data.user;
        $scope.payments = data.payments;
        $scope.currentYear = data.currentYear;

        var page = data.page;
        $scope.rowCount = data.rowCount;

        $scope.next = function(){
            page++;
            $location.search('page', page);
            $location.path("/user/"+$scope.user._id+"/payment");
        }

        $scope.previous = function(){
            page--;
            $location.search('page', page);
            $location.path("/user/"+$scope.user._id+"/payment");
        }

        $scope.showNext = function(){
            if($scope.payments.length == $scope.rowCount){
                return true;                
            }
            return false;
        }

        $scope.showPrevious = function(){
            if(page <= 1){
                return false;
            }
            return true;
        }
    });
