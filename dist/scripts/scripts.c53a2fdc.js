"use strict";angular.module("segoraClientApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/home",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/user",{templateUrl:"views/users.html",controller:"UsersListCtrl",resolve:{data:["$q","$route","UserService",function(a,b,c){var d=a.defer(),e={};return c.list(function(a){e.users=a,d.resolve(e)}),d.promise}]}}).when("/user/:userId",{templateUrl:"views/user-detail.html",controller:"UserDetailCtrl",resolve:{data:["$q","$route","UserService","AddressService",function(a,b,c,d){var e=a.defer(),f=b.current.params.userId,g={};return g.userId=f,"new"===f?c.createNew(function(a){g.user=a,g.address=null,g.addressId=null,e.resolve(g)}):c.getById(f,function(a){g.user=a,d.getByUserId(f,function(a){g.address=a,g.addressId=a?a._id:null,e.resolve(g)})}),e.promise}]}}).when("/user/:userId/address/:addressId",{templateUrl:"views/user-address.html",controller:"UserAddressDetailCtrl",resolve:{data:["$q","$route","UserService",function(a,b,c){var d=a.defer(),e=b.current.params.userId,f=b.current.params.addressId,g={};return c.getById(e,function(a){g.user=a,g.addressId=f,g.address=null,d.resolve(g)}),d.promise}]}}).when("/user/:userId/payment",{templateUrl:"views/user-payments.html",controller:"UserPaymentsCtrl",resolve:{data:["$q","$route","$location","UserService","PaymentService","Settings",function(a,b,c,d,e,f){var g=a.defer(),h=b.current.params.userId,i={},j=f.rowCount,k=c.search().page?c.search().page:1;return i.page=k,i.rowCount=j,i.currentYear=(new Date).getFullYear(),d.getById(h,function(a){i.user=a,e.getByUserId(h,j,k,function(a){i.payments=a,g.resolve(i)})}),g.promise}]}}).when("/user/:userId/payment/:paymentId",{templateUrl:"views/user-payment.html",controller:"UserPaymentDetailCtrl",resolve:{data:["$q","$route","UserService","PaymentService",function(a,b,c,d){var e=a.defer(),f=b.current.params.userId,g=b.current.params.paymentId,h={};return h.paymentId=g,h.userId=f,c.getById(f,function(a){h.user=a,"new"===g?d.createNew(f,function(a){h.payment=a,e.resolve(h)}):d.getById(g,function(a){h.payment=a,e.resolve(h)})}),e.promise}]}}).when("/user/:userId/monthly_payment/:year",{templateUrl:"views/user-monthly-payment.html",controller:"UserMonthlyPaymentCtrl",resolve:{data:["$q","$route","UserService","PaymentService",function(a,b,c,d){var e=a.defer(),f=b.current.params.userId,g=b.current.params.year,h={};h.userId=f,h.selectedYear=g;var i=(new Date).getFullYear();return h.years=[(i-1).toString(),i.toString(),(i+1).toString()],h.months=[{name:"January",number:"1",code:"jan",checked:!1},{name:"February",number:"2",code:"feb",checked:!1},{name:"March",number:"3",code:"mar",checked:!1},{name:"April",number:"4",code:"apr",checked:!1},{name:"May",number:"5",code:"may",checked:!1},{name:"Jun",number:"6",code:"jun",checked:!1},{name:"July",number:"7",code:"jul",checked:!1},{name:"August",number:"8",code:"aug",checked:!1},{name:"September",number:"9",code:"sep",checked:!1},{name:"October",number:"10",code:"oct",checked:!1},{name:"November",number:"11",code:"nov",checked:!1},{name:"December",number:"12",code:"dec",checked:!1}],c.getById(f,function(a){h.user=a,d.getByUserIdAndYear(f,h.selectedYear,function(a){h.payments=a;var b=h.payments.length*h.months.length,c=0;0==b&&(b=h.months.length),h.months.forEach(function(a){a.checked=!1,a.disabled=!1,h.payments&&h.payments.length>0?h.payments.forEach(function(d){a.checked||d.month!=a.number||(a.checked=!0,a.disabled=!0),c++,b==c&&e.resolve(h)}):(c++,b==c&&e.resolve(h))})})}),e.promise}]}}).otherwise({redirectTo:"/home"})}]),angular.module("segoraClientApp").run(["$rootScope","$location","StatusService",function(a,b,c){a.$on("$routeChangeStart",function(){c.start()}),a.$on("$routeChangeSuccess",function(){c.default()}),a.$on("$routeChangeError",function(){c.error("Failed to change routes :(")}),c.default()}]),angular.module("segoraClientApp").constant("Settings",{appName:"SEGORA",backendHost:"http://segora-services.herokuapp.com",rowCount:10}),angular.module("segoraClientApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("segoraClientApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("segoraClientApp").controller("UsersListCtrl",["$scope","data",function(a,b){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.users=b.users}]),angular.module("segoraClientApp").controller("UserDetailCtrl",["$scope","$route","$location","$http","UserService","AddressService","StatusService","data",function(a,b,c,d,e,f,g,h){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.userId=h.userId,a.user=h.user,a.address=h.address,a.addressId=h.addressId,a.currentYear=(new Date).getFullYear(),a.editMode="new"==a.userId?!0:!1,a.getAddressId=function(){return null!==a.address&&a.address?a.address._id:"null"},a.edit=function(){a.editMode=!0},a.done=function(){a.editMode?a.editMode=!1:c.path("/user")},a.save=function(){a.user._id?(g.start(),e.update(a.user,function(){a.editMode=!1,g.stop()})):e.save(a.user,function(a){c.path("/user/"+a[0]._id)})},a.remove=function(){a.user.$remove({userId:a.userId},function(){c.path("/user")})}}]),angular.module("segoraClientApp").controller("UserAddressDetailCtrl",["$scope","$location","AddressService","StatusService","data",function(a,b,c,d,e){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.user=e.user,a.address=e.address,a.addressId=e.addressId,"null"==a.addressId?(a.editMode=!0,c.createNew(a.user._id,function(b){a.address=b})):(a.editMode=!1,c.getById(a.addressId,function(b){a.address=b})),a.edit=function(){a.editMode=!0},a.done=function(){a.editMode?a.editMode=!1:b.path("/user/"+a.user._id)},a.save=function(){a.address._id?(d.start(),c.update(a.address,function(){a.editMode=!1,d.stop()})):c.save(a.address,function(c){b.path("/user/"+a.user._id+"/address/"+c[0]._id)})},a.remove=function(){a.address.$remove({addressId:a.addressId},function(){b.path("/user/"+a.user._id)})}}]),angular.module("segoraClientApp").factory("UserService",["$resource","Settings",function(a,b){var c=42,d=a(b.backendHost+"/collections/user/:userId",{userId:"@id"},{save:{method:"POST",isArray:!0},update:{method:"PUT"}});return{someMethod:function(){return c},list:function(a){var b=d.query(function(){a(b)})},getById:function(a,b){d.get({userId:a},function(a){b(a)})},createNew:function(a){a(new d)},save:function(a,b){var c=angular.copy(a);c.$save().then(function(a){b(a)})},update:function(a,b){var c=angular.copy(a);c._id=void 0,c.$update({userId:a._id,test:!0}).then(function(){b()})}}}]),angular.module("segoraClientApp").service("AddressService",["$resource","Settings",function(a,b){var c=a(b.backendHost+"/collections/address/:addressId",{addressId:"@_id"},{save:{method:"POST",isArray:!0},update:{method:"PUT"},getByUserId:{method:"GET",isArray:!0}});return{getById:function(a,b){c.get({addressId:a},function(a){b(a)})},getByUserId:function(a,b){c.getByUserId({userId:a},function(a){b(a[0])})},createNew:function(a,b){var d=new c;d.userId=a,b(d)},save:function(a,b){var c=angular.copy(a);c.$save().then(function(a){console.log(a),b(a)})},update:function(a,b){var c=angular.copy(a);c._id=void 0,c.$update({addressId:a._id,test:!0}).then(function(){b()})}}}]),angular.module("segoraClientApp").controller("UserPaymentsCtrl",["$scope","$location","data",function(a,b,c){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.user=c.user,a.payments=c.payments,a.currentYear=c.currentYear;var d=c.page;a.rowCount=c.rowCount,a.next=function(){d++,b.search("page",d),b.path("/user/"+a.user._id+"/payment")},a.previous=function(){d--,b.search("page",d),b.path("/user/"+a.user._id+"/payment")},a.showNext=function(){return a.payments.length==a.rowCount?!0:!1},a.showPrevious=function(){return 1>=d?!1:!0}}]),angular.module("segoraClientApp").service("PaymentService",["$resource","Settings",function(a,b){var c=a(b.backendHost+"/collections/payment/:paymentId",{paymentId:"@_id"},{save:{method:"POST",isArray:!0},update:{method:"PUT"},getByUserId:{method:"GET",isArray:!0}});return{getById:function(a,b){c.get({paymentId:a},function(a){b(a)})},getByUserId:function(a,b,d,e){var f=b,g=d;c.getByUserId({userId:a,limit:f,skip:g*f-f},function(a){e(a)})},getByUserIdAndYear:function(a,b,d){c.getByUserId({userId:a,year:b,limit:12,skip:0},function(a){d(a)})},createNew:function(a,b){var d=new c;d.userId=a,b(d)},save:function(a,b){var c=angular.copy(a);c.$save().then(function(a){console.log(a),b(a)})}}}]),angular.module("segoraClientApp").service("StatusService",["$rootScope",function(a){return{"default":function(){a.alertType="",a.alertMessage="",a.active="progress-success",$("#progressBarModal").modal("hide")},start:function(){a.alertType="",a.alertMessage="",a.active="progress-striped active progress-warning",$("#progressBarModal").modal("hide"),$("#progressBarModal").modal("show")},stop:function(b){a.alertType="alert alert-success",a.alertMessage=b,a.active="progress-success",$("#progressBarModal").modal("hide")},error:function(b){a.alertType="alert-danger",a.alertMessage=b,a.active="",$("#progressBarModal").modal("hide")}}}]),angular.module("segoraClientApp").controller("UserPaymentDetailCtrl",["$scope","$location","PaymentService","data",function(a,b,c,d){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.user=d.user,a.payment=d.payment,a.paymentId=d.paymentId,a.editMode="new"==a.paymentId?!0:!1,a.edit=function(){a.editMode=!0},a.done=function(){a.editMode=!1},a.save=function(){a.payment._id?(a.payment._id=void 0,a.payment.$update({paymentId:paymentId,test:!0},function(){b.path("/user/"+a.user._id+"/payment")})):c.save(a.payment,function(){b.path("/user/"+a.user._id+"/payment")})},a.remove=function(){a.payment.$remove({paymentId:a.paymentId},function(){b.path("/user/"+a.user._id+"/payment")})}}]),angular.module("segoraClientApp").controller("UserMonthlyPaymentCtrl",["$scope","$location","PaymentService","data",function(a,b,c,d){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],a.months=d.months,a.years=d.years,a.userId=d.userId,a.user=d.user,a.selectedYear=d.selectedYear,a.payments=d.payments,a.paymentsToProcess=[],a.changeYear=function(){b.path("/user/"+a.userId+"/monthly_payment/"+a.selectedYear)},a.done=function(){return b.path("/user/"+a.userId)},a.save=function(){a.months.forEach(function(b){b.checked&&!b.disabled&&a.paymentsToProcess.push(b)});var d=a.paymentsToProcess.length,e=0;a.paymentsToProcess.forEach(function(f){c.createNew(a.userId,function(g){g.year=a.selectedYear,g.month=f.number,g.amount=80,c.save(g,function(){e++,d==e&&b.path("/user/"+a.userId+"/payment")})})})}}]),angular.module("segoraClientApp").directive("userTab",["AddressService",function(a){return{restrict:"E",templateUrl:"templates/user-tab.html",scope:{user:"=",activeTab:"@"},link:function(b){a.getByUserId(b.user._id,function(a){b.address=a,b.addressId=a?a._id:null}),b.getAddressId=function(){return null!==b.address&&b.address?b.address._id:"null"},b.currentYear=(new Date).getFullYear(),b.getCurrentYear=function(){return b.currentYear},b.isActive=function(a){return b.activeTab==a?"active":""}}}}]);