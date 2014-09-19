'use strict';

angular.module('segoraClientApp')
    .service('StatusService', function($rootScope) {
        return {
            default: function() {           
                $('#progressBarModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $rootScope.progressActive = "progress-success";
            },
            start: function() {
                $('body').addClass('modal-open');
                $('#progressBarModal').modal('show');
                $rootScope.progressActive = "progress-striped active progress-warning";
            },
            stop: function(message) {
                $('#progressBarModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $rootScope.progressActive = "progress-success";
                
            },
            error: function(message) {
                $('#progressBarModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                $rootScope.progressActive = '';
            }
        }
    });
