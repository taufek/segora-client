'use strict';

angular.module('segoraClientApp')
    .factory('UserService', function($resource, Settings) {
        // Service logic
        // ...

        var meaningOfLife = 42;

        var User = $resource(
            Settings.backendHost+'/collections/user/:userId', {
                userId: '@id'
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
            someMethod: function() {
                return meaningOfLife;
            },
            list: function(fn) {
                var users = User.query(function() {
                    // console.log(users);
                    fn(users);
                });
            },
            getById: function(id, fn) {
                User.get({
                    userId: id
                }, function(user) {
                    fn(user);
                });
            },
            createNew: function(fn) {
                fn(new User());
            },
            save: function(userData, fn) {
                var user = angular.copy(userData);
                user.$save()
                    .then(function(o, res) {
                        fn(o);
                    });
                // .catch(function(req) { console.log("error saving obj"); })
                // .finally(function()  { console.log("always called") });
            },
            update: function(userData, fn) {
                var user = angular.copy(userData);
                user._id = undefined;
                user.$update({
                    'userId': userData._id,
                    'test': true
                    })
                    .then(function(o, res) {
                        fn();
                    });
            },            
            remove: function(userData, fn) {
                var user = angular.copy(userData);
                user._id = undefined;
                user.$remove({
                    'userId': userData._id
                    })
                    .then(function(o, res) {
                        fn();
                    });
            }
        };
    });
