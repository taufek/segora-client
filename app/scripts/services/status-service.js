'use strict';

angular.module('segoraClientApp')
    .service('StatusService', function() {
        return {
            default: function() {           
                $('#progressBarModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            },
            start: function() {
                $('body').addClass('modal-open');
                $('#progressBarModal').modal('show');
            },
            stop: function(message) {
                $('#progressBarModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
                
            },
            error: function(message) {
                $('#progressBarModal').modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            }
        }
    });
