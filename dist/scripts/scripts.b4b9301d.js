"use strict";angular.module("segoraClientApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/user",{templateUrl:"views/users.html",controller:"UsersListCtrl"}).when("/user/:userId",{templateUrl:"views/user-detail.html",controller:"UserDetailCtrl"}).when("/user/:userId/address/:addressId",{templateUrl:"views/user-address.html",controller:"UserAddressDetailCtrl",resolve:{data:function(a,b,c){var d=a.defer(),e=b.current.params.userId,f=b.current.params.addressId,g={};return c.getById(e,function(a){g.user=a,g.addressId=f,g.address=null,d.resolve(g)}),d.promise}}}).otherwise({redirectTo:"/"})}]),angular.module("segoraClientApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("segoraClientApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("segoraClientApp").controller("UsersListCtrl",["$scope","UserService",function(a,b){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],b.list(function(b){a.users=b})}]),angular.module("segoraClientApp").controller("UserDetailCtrl",["$scope","$route","$location","$http","UserService","AddressService",function(a,b,c,d,e,f){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"];var g=b.current.params.userId;a.showAddressButton=!1,f.getByUserId(g,function(b){a.address=b,a.showAddressButton=!0}),"new"==g?(a.editMode=!0,e.createNew(function(b){a.user=b})):(a.editMode=!1,e.getById(g,function(b){a.user=b})),window.scope=a,a.getAddressId=function(){return null!==a.address&&a.address?a.address._id:"null"},a.edit=function(){a.editMode=!0},a.done=function(){a.editMode=!1},a.save=function(){a.user._id?(a.user._id=void 0,a.user.$update({userId:g,test:!0},function(){c.path("/user")})):e.save(a.user,function(){c.path("/user")})},a.remove=function(){a.user.$remove({userId:g},function(){c.path("/user")})}}]),angular.module("segoraClientApp").controller("UserAddressDetailCtrl",["$scope","$location","AddressService","data",function(a,b,c,d){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.user=d.user,a.address=d.address,a.addressId=d.addressId,"null"==a.addressId?(a.editMode=!0,c.createNew(a.user._id,function(b){a.address=b})):(a.editMode=!1,c.getById(a.addressId,function(b){a.address=b})),a.edit=function(){a.editMode=!0},a.done=function(){a.editMode=!1},a.save=function(){a.address._id?(a.address._id=void 0,a.address.$update({addressId:addressId,test:!0},function(){b.path("/user")})):c.save(a.address,function(){b.path("/users")})},a.remove=function(){a.address.$remove({addressId:a.addressId},function(){b.path("/address")})}}]),angular.module("segoraClientApp").factory("UserService",["$resource",function(a){var b=42,c=a("http://segora-services.herokuapp.com/collections/user/:userId",{userId:"@id"},{save:{method:"POST",isArray:!0},update:{method:"PUT"}});return{someMethod:function(){return b},list:function(a){var b=c.query(function(){a(b)})},getById:function(a,b){c.get({userId:a},function(a){b(a)})},createNew:function(a){a(new c)},save:function(a,b){var c=angular.copy(a);c.$save().then(function(){b()})}}}]),angular.module("segoraClientApp").service("AddressService",["$resource",function(a){var b=a("http://segora-services.herokuapp.com/collections/address/:addressId",{addressId:"@_id"},{save:{method:"POST",isArray:!0},update:{method:"PUT"},getByUserId:{method:"GET",isArray:!0}});return{getById:function(a,c){b.get({addressId:a},function(a){c(a)})},getByUserId:function(a,c){b.getByUserId({userId:a},function(a){c(a[0])})},createNew:function(a,c){var d=new b;d.userId=a,c(d)},save:function(a,b){var c=angular.copy(a);c.$save().then(function(a){console.log(a),b(a)})}}}]);