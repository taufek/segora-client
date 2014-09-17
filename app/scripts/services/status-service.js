'use strict';

angular.module('segoraClientApp')
    .service('StatusService', function($rootScope) {
        return {
            default: function() {
                $rootScope.alertType = '';
                $rootScope.alertMessage = '';
                $rootScope.active = "progress-success";

                $('#progressBarModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            },
            start: function() {
                $rootScope.alertType = '';
                $rootScope.alertMessage = '';
                $rootScope.active = "progress-striped active progress-warning";
                $('body').addClass('modal-open');
                // $('#progressBarModal').modal('hide');
                $('#progressBarModal').modal('show');
            },
            stop: function(message) {
                $rootScope.alertType = "alert alert-success";
                $rootScope.alertMessage = message;
                $rootScope.active = "progress-success";

                $('#progressBarModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                
            },
            error: function(message) {

                $rootScope.alertType = "alert-danger";
                $rootScope.alertMessage = message;
                $rootScope.active = '';
                $('#progressBarModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            }
        }
    });
