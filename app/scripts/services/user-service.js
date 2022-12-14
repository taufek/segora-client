'use strict';

angular.module('segoraClientApp')
    .factory('UserService', function($resource, $http, Settings, AddressService) {
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
                var users = User.query({sort: "['full_name',1]", limit: 0},
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
            },
            getUsersWithAddress: function(fn){
                this.list(function(users){

                    if(users && users.length > 0){
                        AddressService.list(function(addresses){
                            if(addresses && addresses.length > 0){
                                addresses.forEach(function(address){                                    
                                    users.forEach(function(user){
                                        if(address.userId == user._id.toString()){
                                            user.address = address;
                                            user.address.fullAddress = address.number + ' ' + address.street;
                                        }
                                    });                                    
                                });
                                fn(users);
                            }
                            else{
                                fn(users);
                            }
                        });                        
                    }
                    else{
                        fn(null);
                    }

                });
            },            
            getUserWithAddress: function(id, fn){
                this.getById(id, function(user){
                    if(user){
                        AddressService.getByUserId(id, function(address){
                            if(address){
                                user.address = address;
                                user.address.fullAddress = address.number + ' ' + address.street;
                                fn(user);
                            }
                            else{
                                fn(user);
                            }
                        });                        
                    }
                    else{
                        fn(null);
                    }

                });
            }
        };
    });
