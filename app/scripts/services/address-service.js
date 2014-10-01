'use strict';

/**
 * @ngdoc service
 * @name segoraClientApp.AddressService
 * @description
 * # AddressService
 * Service in the segoraClientApp.
 */
angular.module('segoraClientApp')
    .service('AddressService', function($resource, Settings) {
        var Address = $resource(
            Settings.backendHost+'/collections/address/:addressId', {
                addressId: '@_id'
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
            list: function(fn) {
                var addresses = Address.query(function() {
                    fn(addresses);
                },
                function(){
                    console.log('Error');


                });
               
            },
            getById: function(id, fn) {
                Address.get({
                    addressId: id
                }, function(address) {
                    fn(address);
                });
            },
            getByUserId: function(userId, fn) {
                Address.getByUserId({
                    userId: userId
                }, function(addresses) {
                    fn(addresses[0]);
                });
            },
            createNew: function(userId, fn) {
                var address = new Address();
                address.userId = userId;
                fn(address);
            },
            save: function(addressData, fn) {
                var address = angular.copy(addressData);
                address.$save()
                    .then(function(o, res) {
                        
                        fn(o);
                    });
            },
            update: function(addressData, fn) {
                var address = angular.copy(addressData);
                address._id = undefined;
                address.$update({
                    'addressId': addressData._id
                    })
                    .then(function(o, res) {
                        fn();
                    });
            },          
            remove: function(addressData, fn) {
                var address = angular.copy(addressData);
                address._id = undefined;
                address.$remove({
                    'addressId': addressData._id
                    })
                    .then(function(o, res) {
                        fn();
                    });
            }
        }

    });
