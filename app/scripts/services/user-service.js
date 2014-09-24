'use strict';

angular.module('segoraClientApp')
    .factory('UserService', function($resource, $http, Settings, DigestHttp, md5) {
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
                // var users = User.query(function() {
                //     // 
                //     fn(users);
                // },
                // function(err){
                //     console.log(err);


                // });
                var dh = new DigestHttp($http, md5);

                dh.setUserName('james');
                dh.setPassword('5f4dcc3b5aa765d61d8327deb882cf99');
                dh.sendRequest('GET',
                    Settings.backendHost,
                    '/collections/user',
                    null, 
                    {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    function(data, status, headers, config) {
                        console.log(data);
                        fn(data);
                    }
                );
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
