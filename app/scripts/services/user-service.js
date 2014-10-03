'use strict';

angular.module('segoraClientApp')
    .factory('UserService', function($resource, $http, Settings) {
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
                'getByUsername': {
                    method: 'GET',
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
                var users = User.query({limit: 0},
                function() {
                    fn(users);
                },
                function(){
                    console.log('Error');


                });
               
            },
            getById: function(id, fn) {
                User.get({
                    userId: id
                }, function(user) {
                    fn(user);
                });
            },
            getByUsername: function(userName, fn) {
                User.getByUsername({
                    user_name: userName
                }, function(result) {
                    if(result){
                        fn(result[0]);
                    }
                    else{
                        fn(null);
                    }
                    
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
                // .catch(function(req) {  })
                // .finally(function()  { 
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
