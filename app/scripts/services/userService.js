'use strict';

angular.module('segoraClientApp')
  .factory('userService', function ($resource) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    var User = $resource(
      'http://segora-services.herokuapp.com/collections/user/:userId', 
      {userId:'@id'},
      {'update': {method : 'PUT', isArray: true}}
    );
   

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      },
      list: function(fn) {
        var users = User.query(function(){
          // console.log(users);
          fn(users);
        });
      },
      getById: function(id, fn) {
        User.get({userId:id}, function(user) {
          fn(user);
       });
      }
    };
  });
