'use strict';

angular.module('segoraClientApp')
  .factory('userService', function ($resource) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    var User = $resource(
      'http://segora-services.herokuapp.com/collections/user/:userId', 
      {userId:'@id'},
      {
        'save': {method : 'POST', isArray: true},
        'update': {method : 'PUT'}
      }
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
      },
      createNew: function(fn){
        fn(new User());
      },
      save: function(userData, fn){
        var user = new User();
        user.full_name = userData.full_name;
        user.user_name = userData.user_name;
        user.$save({}, function(){
          console.log('OK');
          fn();
        })
      }
    };
  });
