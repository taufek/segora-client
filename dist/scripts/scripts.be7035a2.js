"use strict";angular.module("segoraClientApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/user",{templateUrl:"views/users.html",controller:"UsersListCtrl",resolve:{data:["$q","$route","UserService",function(a,b,c){var d=a.defer(),e={};return c.list(function(a){e.users=a,d.resolve(e)}),d.promise}]}}).when("/user/:userId",{templateUrl:"views/user-detail.html",controller:"UserDetailCtrl",resolve:{data:["$q","$route","UserService","AddressService",function(a,b,c,d){var e=a.defer(),f=b.current.params.userId,g={};return g.userId=f,"new"===f?c.createNew(function(a){g.user=a,g.address=null,g.addressId=null,e.resolve(g)}):c.getById(f,function(a){g.user=a,d.getByUserId(f,function(a){g.address=a,g.addressId=a?a._id:null,e.resolve(g)})}),e.promise}]}}).when("/user/:userId/address/:addressId",{templateUrl:"views/user-address.html",controller:"UserAddressDetailCtrl",resolve:{data:["$q","$route","UserService",function(a,b,c){var d=a.defer(),e=b.current.params.userId,f=b.current.params.addressId,g={};return c.getById(e,function(a){g.user=a,g.addressId=f,g.address=null,d.resolve(g)}),d.promise}]}}).when("/user/:userId/payment",{templateUrl:"views/user-payments.html",controller:"UserPaymentsCtrl",resolve:{data:["$q","$route","UserService","PaymentService",function(a,b,c,d){var e=a.defer(),f=b.current.params.userId,g={};return g.currentYear=(new Date).getFullYear(),c.getById(f,function(a){g.user=a,d.getByUserId(f,function(a){g.payments=a,e.resolve(g)})}),e.promise}]}}).when("/user/:userId/payment/:paymentId",{templateUrl:"views/user-payment.html",controller:"UserPaymentDetailCtrl",resolve:{data:["$q","$route","UserService","PaymentService",function(a,b,c,d){var e=a.defer(),f=b.current.params.userId,g=b.current.params.paymentId,h={};return h.paymentId=g,h.userId=f,c.getById(f,function(a){h.user=a,"new"===g?d.createNew(f,function(a){h.payment=a,e.resolve(h)}):d.getById(g,function(a){h.payment=a,e.resolve(h)})}),e.promise}]}}).when("/user/:userId/monthly_payment/:year",{templateUrl:"views/user-monthly-payment.html",controller:"UserMonthlyPaymentCtrl",resolve:{data:["$q","$route","UserService","PaymentService",function(a,b,c,d){var e=a.defer(),f=b.current.params.userId,g=b.current.params.year,h={};h.userId=f,h.selectedYear=g;var i=(new Date).getFullYear();return h.years=[(i-1).toString(),i.toString(),(i+1).toString()],h.months=[{name:"January",number:"1",code:"jan",checked:!1},{name:"February",number:"2",code:"feb",checked:!1},{name:"March",number:"3",code:"mar",checked:!1},{name:"April",number:"4",code:"apr",checked:!1},{name:"May",number:"5",code:"may",checked:!1},{name:"Jun",number:"6",code:"jun",checked:!1},{name:"July",number:"7",code:"jul",checked:!1},{name:"August",number:"8",code:"aug",checked:!1},{name:"September",number:"9",code:"sep",checked:!1},{name:"October",number:"10",code:"oct",checked:!1},{name:"November",number:"11",code:"nov",checked:!1},{name:"December",number:"12",code:"dec",checked:!1}],c.getById(f,function(a){h.user=a,d.getByUserIdAndYear(f,h.selectedYear,function(a){h.payments=a,h.payments&&h.payments.length>0&&h.months.forEach(function(a){h.payments.forEach(function(b){a.checked=!1,a.disabled=!1,a.checked||b.month!=a.number||(console.log(b.month+" "+a.number),a.checked=!0,a.disabled=!0,console.log(a))})}),console.log("render"),console.log(h.months),e.resolve(h)})}),e.promise}]}}).otherwise({redirectTo:"/"})}]),angular.module("segoraClientApp").run(["$rootScope","$location","StatusService",function(a,b,c){a.$on("$routeChangeStart",function(){c.start()}),a.$on("$routeChangeSuccess",function(){c.default()}),a.$on("$routeChangeError",function(){c.error("Failed to change routes :(")}),c.default()}]),angular.module("segoraClientApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("segoraClientApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("segoraClientApp").controller("UsersListCtrl",["$scope","data",function(a,b){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.users=b.users}]),angular.module("segoraClientApp").controller("UserDetailCtrl",["$scope","$route","$location","$http","UserService","AddressService","data",function(a,b,c,d,e,f,g){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.userId=g.userId,a.user=g.user,a.address=g.address,a.addressId=g.addressId,a.editMode="new"==a.userId?!0:!1,a.getAddressId=function(){return null!==a.address&&a.address?a.address._id:"null"},a.edit=function(){a.editMode=!0},a.done=function(){a.editMode=!1},a.save=function(){a.user._id?(a.user._id=void 0,a.user.$update({userId:a.userId,test:!0},function(){c.path("/user")})):e.save(a.user,function(){c.path("/user")})},a.remove=function(){a.user.$remove({userId:a.userId},function(){c.path("/user")})}}]),angular.module("segoraClientApp").controller("UserAddressDetailCtrl",["$scope","$location","AddressService","data",function(a,b,c,d){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.user=d.user,a.address=d.address,a.addressId=d.addressId,"null"==a.addressId?(a.editMode=!0,c.createNew(a.user._id,function(b){a.address=b})):(a.editMode=!1,c.getById(a.addressId,function(b){a.address=b})),a.edit=function(){a.editMode=!0},a.done=function(){a.editMode=!1},a.save=function(){a.address._id?(a.address._id=void 0,a.address.$update({addressId:addressId,test:!0},function(){b.path("/user")})):c.save(a.address,function(){b.path("/users")})},a.remove=function(){a.address.$remove({addressId:a.addressId},function(){b.path("/address")})}}]),angular.module("segoraClientApp").factory("UserService",["$resource",function(a){var b=42,c=a("http://segora-services.herokuapp.com/collections/user/:userId",{userId:"@id"},{save:{method:"POST",isArray:!0},update:{method:"PUT"}});return{someMethod:function(){return b},list:function(a){var b=c.query(function(){a(b)})},getById:function(a,b){c.get({userId:a},function(a){b(a)})},createNew:function(a){a(new c)},save:function(a,b){var c=angular.copy(a);c.$save().then(function(){b()})}}}]),angular.module("segoraClientApp").service("AddressService",["$resource",function(a){var b=a("http://segora-services.herokuapp.com/collections/address/:addressId",{addressId:"@_id"},{save:{method:"POST",isArray:!0},update:{method:"PUT"},getByUserId:{method:"GET",isArray:!0}});return{getById:function(a,c){b.get({addressId:a},function(a){c(a)})},getByUserId:function(a,c){b.getByUserId({userId:a},function(a){c(a[0])})},createNew:function(a,c){var d=new b;d.userId=a,c(d)},save:function(a,b){var c=angular.copy(a);c.$save().then(function(a){console.log(a),b(a)})}}}]),angular.module("segoraClientApp").controller("UserPaymentsCtrl",["$scope","data",function(a,b){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.user=b.user,a.payments=b.payments,a.currentYear=b.currentYear}]),angular.module("segoraClientApp").service("PaymentService",["$resource",function(a){var b=a("http://segora-services.herokuapp.com/collections/payment/:paymentId",{paymentId:"@_id"},{save:{method:"POST",isArray:!0},update:{method:"PUT"},getByUserId:{method:"GET",isArray:!0}});return{getById:function(a,c){b.get({paymentId:a},function(a){c(a)})},getByUserId:function(a,c){b.getByUserId({userId:a},function(a){c(a)})},getByUserIdAndYear:function(a,c,d){b.getByUserId({userId:a,year:c},function(a){d(a)})},createNew:function(a,c){var d=new b;d.userId=a,c(d)},save:function(a,b){var c=angular.copy(a);c.$save().then(function(a){console.log(a),b(a)})}}}]),angular.module("segoraClientApp").service("StatusService",["$rootScope",function(a){return{"default":function(){a.alertType="",a.alertMessage="",a.active="progress-success",$("#progressBarModal").modal("hide")},start:function(){a.alertType="",a.alertMessage="",a.active="progress-striped active progress-warning",$("#progressBarModal").modal("show")},stop:function(b){a.alertType="alert alert-success",a.alertMessage=b,a.active="progress-success",$("#progressBarModal").modal("hide")},error:function(b){a.alertType="alert-danger",a.alertMessage=b,a.active="",$("#progressBarModal").modal("hide")}}}]),angular.module("segoraClientApp").controller("UserPaymentDetailCtrl",["$scope","$location","PaymentService","data",function(a,b,c,d){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.user=d.user,a.payment=d.payment,a.paymentId=d.paymentId,a.editMode="new"==a.paymentId?!0:!1,a.edit=function(){a.editMode=!0},a.done=function(){a.editMode=!1},a.save=function(){a.payment._id?(a.payment._id=void 0,a.payment.$update({paymentId:paymentId,test:!0},function(){b.path("/user/"+a.user._id+"/payment")})):c.save(a.payment,function(){b.path("/user/"+a.user._id+"/payment")})},a.remove=function(){a.payment.$remove({paymentId:a.paymentId},function(){b.path("/user/"+a.user._id+"/payment")})}}]),angular.module("segoraClientApp").controller("UserMonthlyPaymentCtrl",["$scope","$location","data",function(a,b,c){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.months=c.months,a.years=c.years,a.userId=c.userId,a.selectedYear=c.selectedYear,a.payments=c.payments,a.changeYear=function(){b.path("/user/"+a.userId+"/monthly_payment/"+a.selectedYear)}}]);