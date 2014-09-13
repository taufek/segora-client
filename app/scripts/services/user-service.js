'use strict';

angular.module('segoraClientApp')
    .factory('UserService', function($resource) {
        // Service logic
        // ...

        var meaningOfLife = 42;

        var User = $resource(
            'http://segora-services.herokuapp.com/collections/user/:userId', {
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
                        fn();
                    });
                // .catch(function(req) { console.log("error saving obj"); })
                // .finally(function()  { console.log("always called") });
            }
        };
    });
