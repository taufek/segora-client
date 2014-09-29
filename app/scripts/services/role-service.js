'use strict';

angular.module('segoraClientApp')
    .factory('RoleService', function($resource, $http, Settings) {
       
        var Role = $resource(
            Settings.backendHost+'/collections/role/:roleId', {
                roleId: '@id'
            }, {
                'save': {
                    method: 'POST',
                    isArray: true
                },
                'update': {
                    method: 'PUT'
                }
            }
        );


        // Public API here
        return {
            
            list: function(fn) {
                var roles = Role.query(function() {
                    fn(roles);
                },
                function(err){
                    console.log(err);
                });
            },
            getById: function(id, fn) {
                Role.get({
                    roleId: id
                }, function(role) {
                    fn(role);
                });
            },
            createNew: function(fn) {
                fn(new Role());
            },
            save: function(roleData, fn) {
                var role = angular.copy(roleData);
                role.$save()
                    .then(function(o, res) {
                        fn(o);
                    });
                // .catch(function(req) {  })
                // .finally(function()  { 
            },
            update: function(roleData, fn) {
                var role = angular.copy(roleData);
                role._id = undefined;
                role.$update({
                    'roleId': roleData._id,
                    'test': true
                    })
                    .then(function(o, res) {
                        fn();
                    });
            },            
            remove: function(roleData, fn) {
                var role = angular.copy(roleData);
                role._id = undefined;
                role.$remove({
                    'groupId': groupData._id
                    })
                    .then(function(o, res) {
                        fn();
                    });
            }
        };
    });
