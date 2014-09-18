'use strict';

/**
 * @ngdoc service
 * @name segoraClientApp.CredentialService
 * @description
 * # CredentialService
 * Service in the segoraClientApp.
 */
angular.module('segoraClientApp')
    .service('CredentialService', function($resource, Settings) {
        var Credential = $resource(
            Settings.backendHost+'/collections/credential/:credentialId', {
                credentialId: '@_id'
            }, {
                'save': {
                    method: 'POST',
                    isArray: true
                },
                'update': {
                    method: 'PUT'
                },
                'getByUserId': {
                    method: 'GET',
                    isArray: true
                }
            }
        );

        return {
            getById: function(id, fn) {
                Credential.get({
                    credentialId: id
                }, function(credential) {
                    fn(credential);
                });
            },
            getByUserId: function(userId, fn) {
                Credential.getByUserId({
                    userId: userId
                }, function(credentials) {
                    fn(credentials[0]);
                });
            },
            createNew: function(userId, fn) {
                var credential = new Credential();
                credential.userId = userId;
                fn(credential);
            },
            save: function(credentialData, fn) {
                var credential = angular.copy(credentialData);
                credential.$save()
                    .then(function(o, res) {
                        console.log(o);
                        fn(o);
                    });
            },
            update: function(credentialData, fn) {
                var credential = angular.copy(credentialData);
                credential._id = undefined;
                credential.$update({
                    'credentialId': credentialData._id
                    })
                    .then(function(o, res) {
                        fn();
                    });
            },          
            remove: function(credentialData, fn) {
                var credential = angular.copy(credentialData);
                credential._id = undefined;
                credential.$remove({
                    'credentialId': credentialData._id
                    })
                    .then(function(o, res) {
                        fn();
                    });
            }
        }

    });
