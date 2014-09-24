'use strict';

angular.module('segoraClientApp')
    .factory('GroupService', function($resource, $http, Settings) {
       
        var Group = $resource(
            Settings.backendHost+'/collections/group/:groupId', {
                groupId: '@id'
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
                var groups = Group.query(function() {
                    fn(groups);
                },
                function(err){
                    console.log(err);
                });
            },
            getById: function(id, fn) {
                Group.get({
                    groupId: id
                }, function(group) {
                    fn(group);
                });
            },
            createNew: function(fn) {
                fn(new Group());
            },
            save: function(groupData, fn) {
                var group = angular.copy(groupData);
                group.$save()
                    .then(function(o, res) {
                        fn(o);
                    });
                // .catch(function(req) {  })
                // .finally(function()  { 
            },
            update: function(groupData, fn) {
                var group = angular.copy(groupData);
                group._id = undefined;
                group.$update({
                    'groupId': groupData._id,
                    'test': true
                    })
                    .then(function(o, res) {
                        fn();
                    });
            },            
            remove: function(groupData, fn) {
                var group = angular.copy(groupData);
                group._id = undefined;
                group.$remove({
                    'groupId': groupData._id
                    })
                    .then(function(o, res) {
                        fn();
                    });
            }
        };
    });
