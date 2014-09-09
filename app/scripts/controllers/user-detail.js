'use strict';

/**
 * @ngdoc function
 * @name segoraClientApp.controller:UserDetailCtrl
 * @description
 * # UserDetailCtrl
 * Controller of the segoraClientApp
 */
angular.module('segoraClientApp')
  .controller('UserDetailCtrl', function ($scope, $route, $location, $http, userService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var userId = $route.current.params.userId;

    if(userId == 'new'){
      $scope.editMode = true;
      userService.createNew(function(user){
        $scope.user = user;
      })
    }
    else{
      $scope.editMode = false;   

      userService.getById(userId, function(user){
      $scope.user = user; 
    });   
    }


    $scope.edit = function(){
      $scope.editMode = true;
    };

    $scope.done = function(){
      $scope.editMode = false;
    };   

    

    $scope.save = function(){
      console.log($scope.user);
      if($scope.user._id){
        $scope.user._id = undefined;
        $scope.user.$update({'userId':userId, 'test': true}, function(){
          $location.path('/users');
        });
      }
      else{
        console.log($scope.user);

        var userToSave = angular.copy($scope.user);

        var promise = userToSave.$save();
        console.log(promise);
        promise.then(function(o, res)  { $location.path('/users'); })
        .catch(function(req) { console.log("error saving obj"); })
        .finally(function()  { console.log("always called") });
        // userService.save($scope.user, function(){
        //   $location.path('/users');
        // });
        // var promise = $scope.user.$save({}, function(){
        //   console.log('saved');
        // },
        // function(){
        //   console.log('error save');
        // });
        // promise
        
      }      
    };

    $scope.remove = function(){
      console.log($scope.user);
      $scope.user.$remove({'userId':userId}, function(){
        $location.path('/users');
      });
    };

  });
