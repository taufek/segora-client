"use strict";angular.module("segoraClientApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","angular-md5"]).config(["$routeProvider",function(a){a.when("/home",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/user",{templateUrl:"views/users.html",controller:"UsersListCtrl",resolve:{data:["$q","$route","UserService",function(a,b,c){var d=a.defer(),e={};return c.list(function(a){e.users=a,d.resolve(e)}),d.promise}]}}).when("/address",{templateUrl:"views/addresses.html",controller:"AddressesListCtrl",resolve:{data:["$q","$route","AddressService",function(a,b,c){var d=a.defer(),e={};return c.list(function(a){e.addresses=a,e.addresses.forEach(function(a){a.fullAddress=a.number+" "+a.street}),d.resolve(e)}),d.promise}]}}).when("/user/:userId",{templateUrl:"views/user-detail.html",controller:"UserDetailCtrl",resolve:{data:["$q","$route","UserService","AddressService","GroupService",function(a,b,c,d){var e=a.defer(),f=b.current.params.userId,g={};return g.userId=f,"new"===f?c.createNew(function(a){g.user=a,g.address=null,g.addressId=null,e.resolve(g)}):c.getById(f,function(a){g.user=a,d.getByUserId(f,function(a){g.address=a,g.addressId=a?a._id:null,e.resolve(g)})}),e.promise}]}}).when("/user/:userId/address/:addressId",{templateUrl:"views/user-address.html",controller:"UserAddressDetailCtrl",resolve:{data:["$q","$route","UserService","AddressService",function(a,b,c,d){var e=a.defer(),f=b.current.params.userId,g=b.current.params.addressId,h={};return c.getById(f,function(a){h.user=a,h.addressId=g,"null"==h.addressId?d.createNew(f,function(a){h.address=a,e.resolve(h)}):d.getById(h.addressId,function(a){h.address=a,e.resolve(h)})}),e.promise}]}}).when("/user/:userId/credential/:credentialId",{templateUrl:"views/user-credential.html",controller:"UserCredentialDetailCtrl",resolve:{data:["$q","$route","UserService",function(a,b,c){var d=a.defer(),e=b.current.params.userId,f=b.current.params.credentialId,g={};return c.getById(e,function(a){g.user=a,g.credentialId=f,g.credential=null,d.resolve(g)}),d.promise}]}}).when("/user/:userId/roles",{templateUrl:"views/user-roles.html",controller:"UserRoleDetailCtrl",resolve:{data:["$q","$route","UserService","RoleService",function(a,b,c,d){var e=a.defer(),f=b.current.params.userId,g=(b.current.params.credentialId,{});return g.userRoles=[],c.getById(f,function(a){g.user=a,d.list(function(a){if(g.roles=a,void 0!=g.user.userRoles){var b=g.user.userRoles.length,c=0;g.user.userRoles.forEach(function(a){g.roles.forEach(function(d){d.code==a&&(g.userRoles.push(d),d.selected=!0,c++,c==b&&e.resolve(g))})})}else e.resolve(g)})}),e.promise}]}}).when("/user/:userId/payment",{templateUrl:"views/user-payments.html",controller:"UserPaymentsCtrl",resolve:{data:["$q","$route","$location","UserService","PaymentService","Settings",function(a,b,c,d,e,f){var g=a.defer(),h=b.current.params.userId,i={},j=f.rowCount,k=c.search().page?c.search().page:1;return i.page=k,i.rowCount=j,i.currentYear=(new Date).getFullYear(),d.getById(h,function(a){i.user=a,e.getByUserId(h,j,k,function(a){i.payments=a,g.resolve(i)})}),g.promise}]}}).when("/user/:userId/payment/:paymentId",{templateUrl:"views/user-payment.html",controller:"UserPaymentDetailCtrl",resolve:{data:["$q","$route","UserService","PaymentService",function(a,b,c,d){var e=a.defer(),f=b.current.params.userId,g=b.current.params.paymentId,h={};return h.paymentId=g,h.userId=f,c.getById(f,function(a){h.user=a,"new"===g?d.createNew(f,function(a){h.payment=a,e.resolve(h)}):d.getById(g,function(a){h.payment=a,e.resolve(h)})}),e.promise}]}}).when("/user/:userId/monthly_payment/:year",{templateUrl:"views/user-monthly-payment.html",controller:"UserMonthlyPaymentCtrl",resolve:{data:["$q","$route","UserService","PaymentService",function(a,b,c,d){var e=a.defer(),f=b.current.params.userId,g=b.current.params.year,h={};h.userId=f,h.selectedYear=g;var i=(new Date).getFullYear();return h.years=[(i-1).toString(),i.toString(),(i+1).toString()],h.months=[{name:"January",number:"1",code:"jan",checked:!1},{name:"February",number:"2",code:"feb",checked:!1},{name:"March",number:"3",code:"mar",checked:!1},{name:"April",number:"4",code:"apr",checked:!1},{name:"May",number:"5",code:"may",checked:!1},{name:"Jun",number:"6",code:"jun",checked:!1},{name:"July",number:"7",code:"jul",checked:!1},{name:"August",number:"8",code:"aug",checked:!1},{name:"September",number:"9",code:"sep",checked:!1},{name:"October",number:"10",code:"oct",checked:!1},{name:"November",number:"11",code:"nov",checked:!1},{name:"December",number:"12",code:"dec",checked:!1}],c.getById(f,function(a){h.user=a,d.getByUserIdAndYear(f,h.selectedYear,function(a){h.payments=a;var b=h.payments.length*h.months.length,c=0;0==b&&(b=h.months.length),h.months.forEach(function(a){a.checked=!1,a.disabled=!1,a.payment=null,h.payments&&h.payments.length>0?h.payments.forEach(function(d){a.checked||d.month!=a.number||(a.checked=!0,a.disabled=!0,a.payment=d),c++,b==c&&e.resolve(h)}):(c++,b==c&&e.resolve(h))})})}),e.promise}]}}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/group",{templateUrl:"views/group.html",controller:"GroupCtrl",resolve:{data:["$q","$route","GroupService","UserSessionService",function(a,b,c,d){var e=a.defer(),f={},g=d.getUser();return c.list(function(a){f.groups=[],d.hasAnyRoles(["admin"])?f.groups=a:a.forEach(function(a){a.selectedAdmins&&a.selectedAdmins.length>0&&a.selectedAdmins.forEach(function(b){g._id==b&&f.groups.push(a)})}),e.resolve(f)}),e.promise}]}}).when("/group/:groupId",{templateUrl:"views/group-detail.html",controller:"GroupDetailCtrl",resolve:{data:["$q","$route","GroupService","UserService",function(a,b,c,d){var e=a.defer(),f=b.current.params.groupId,g={};g.groupId=f,g.selectedUsers=[],g.selectedAdmins=[];var h=function(){d.list(function(a){g.users=a,g.admins=angular.copy(a),g.group.selectedUsers&&g.group.selectedUsers.length>0&&g.group.selectedUsers.forEach(function(a){for(var b=g.users.length-1;b>=0;b--)a===g.users[b]._id&&(g.selectedUsers.push(g.users[b]),g.users.splice(b,1))}),g.group.selectedAdmins&&g.group.selectedAdmins.length>0&&g.group.selectedAdmins.forEach(function(a){for(var b=g.admins.length-1;b>=0;b--)a===g.admins[b]._id&&(g.selectedAdmins.push(g.admins[b]),g.admins.splice(b,1))}),e.resolve(g)})};return"new"===f?c.createNew(function(a){g.group=a,h()}):c.getById(f,function(a){g.group=a,h()}),e.promise}]}}).when("/role",{templateUrl:"views/role.html",controller:"RoleCtrl",resolve:{data:["$q","$route","RoleService",function(a,b,c){var d=a.defer(),e={};return c.list(function(a){e.roles=a,d.resolve(e)}),d.promise}]}}).when("/role/:roleId",{templateUrl:"views/role-detail.html",controller:"RoleDetailCtrl",resolve:{data:["$q","$route","RoleService","UserService",function(a,b,c){var d=a.defer(),e=b.current.params.roleId,f={};return f.roleId=e,"new"===e?c.createNew(function(a){f.role=a,d.resolve(f)}):c.getById(e,function(a){f.role=a,d.resolve(f)}),d.promise}]}}).otherwise({redirectTo:"/home"})}]),angular.module("segoraClientApp").run(["$rootScope","$location","StatusService",function(a,b,c){a.$on("$routeChangeStart",function(){c.start()}),a.$on("$routeChangeSuccess",function(){c.default()}),a.$on("$routeChangeError",function(){c.error("Failed to change routes :(")}),c.default()}]),angular.module("segoraClientApp").constant("Settings",{appName:"SEGORA",backendHost:"http://segora-services.herokuapp.com",rowCount:10}),angular.module("segoraClientApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("segoraClientApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("segoraClientApp").controller("UsersListCtrl",["$scope","data",function(a,b){a.users=b.users,a.currentYear=(new Date).getFullYear()}]),angular.module("segoraClientApp").controller("AddressesListCtrl",["$scope","$location","UserService","data",function(a,b,c,d){a.addresses=d.addresses,a.currentYear=(new Date).getFullYear()}]),angular.module("segoraClientApp").controller("UserDetailCtrl",["$scope","$route","$location","$http","UserService","AddressService","StatusService","FlashService","data",function(a,b,c,d,e,f,g,h,i){a.userId=i.userId,a.user=i.user,a.address=i.address,a.addressId=i.addressId,a.currentYear=(new Date).getFullYear(),a.editMode="new"==a.userId?!0:!1,a.getAddressId=function(){return null!==a.address&&a.address?a.address._id:"null"},a.edit=function(){a.editMode=!0},a.done=function(){a.editMode?a.editMode=!1:c.path("/home")},a.save=function(){return a.userForm.$valid?(g.start(),void(a.user._id?e.update(a.user,function(){a.editMode=!1,g.stop(),h.setMessage("Updated.","success",!0)}):e.save(a.user,function(a){c.path("/user/"+a[0]._id),h.setMessage("Saved.","success")}))):(h.setMessage("Not valid","danger",!0),!1)},a.remove=function(){g.start(),e.remove(a.user,function(){c.path("/user"),h.setMessage("Removed.","success")})}}]),angular.module("segoraClientApp").controller("UserAddressDetailCtrl",["$scope","$location","AddressService","StatusService","FlashService","data",function(a,b,c,d,e,f){a.user=f.user,a.address=f.address,a.addressId=f.addressId,a.editMode="null"==a.addressId?!0:!1,a.edit=function(){a.editMode=!0},a.done=function(){a.editMode?a.editMode=!1:b.path("/user/"+a.user._id)},a.save=function(){return a.addressForm.$valid?(d.start(),void(a.address._id?c.update(a.address,function(){a.editMode=!1,d.stop(),e.setMessage("Updated.","success",!0)}):c.save(a.address,function(c){b.path("/user/"+a.user._id+"/address/"+c[0]._id),e.setMessage("Saved.","success")}))):(e.setMessage("Not valid","danger",!0),!1)},a.remove=function(){d.start(),c.remove(a.address,function(){b.path("/user/"+a.user._id+"/address/null"),e.setMessage("Removed.","success")})}}]),angular.module("segoraClientApp").controller("UserCredentialDetailCtrl",["$scope","$location","CredentialService","StatusService","FlashService","data",function(a,b,c,d,e,f){a.user=f.user,a.credential=f.credential,a.credentialId=f.credentialId,"null"==a.credentialId?(a.editMode=!0,c.createNew(a.user._id,function(b){a.credential=b})):(a.editMode=!1,c.getById(a.credentialId,function(b){a.credential=b,a.credential.password="",a.credential.confirmPassword=""})),a.edit=function(){a.editMode=!0},a.done=function(){a.editMode?a.editMode=!1:b.path("/user/"+a.user._id)},a.save=function(){return a.credentialForm.$valid?(d.start(),a.credential.password!==a.credential.confirmPassword?(d.stop(""),e.setMessage("Password does not match!","danger",!0),!1):void(a.credential._id?c.update(a.credential,function(){a.editMode=!1,d.stop(),e.setMessage("Updated.","success",!0)}):c.save(a.credential,function(c){b.path("/user/"+a.user._id+"/credential/"+c[0]._id),e.setMessage("Saved.","success")}))):(e.setMessage("Not valid","danger",!0),!1)},a.remove=function(){d.start(),c.remove(a.credential,function(){b.path("/user/"+a.user._id+"/credential/null"),e.setMessage("Removed.","success")})}}]),angular.module("segoraClientApp").factory("UserService",["$resource","$http","Settings",function(a,b,c){var d=42,e=a(c.backendHost+"/collections/user/:userId",{userId:"@id"},{save:{method:"POST",isArray:!0},getByUsername:{method:"GET",isArray:!0},update:{method:"PUT"}});return{someMethod:function(){return d},list:function(a){var b=e.query(function(){a(b)},function(){console.log("Error")})},getById:function(a,b){e.get({userId:a},function(a){b(a)})},getByUsername:function(a,b){e.getByUsername({user_name:a},function(a){b(a[0])})},createNew:function(a){a(new e)},save:function(a,b){var c=angular.copy(a);c.$save().then(function(a){b(a)})},update:function(a,b){var c=angular.copy(a);c._id=void 0,c.$update({userId:a._id,test:!0}).then(function(){b()})},remove:function(a,b){var c=angular.copy(a);c._id=void 0,c.$remove({userId:a._id}).then(function(){b()})}}}]),angular.module("segoraClientApp").service("AddressService",["$resource","Settings",function(a,b){var c=a(b.backendHost+"/collections/address/:addressId",{addressId:"@_id"},{save:{method:"POST",isArray:!0},update:{method:"PUT"},getByUserId:{method:"GET",isArray:!0}});return{list:function(a){var b=c.query(function(){a(b)},function(){console.log("Error")})},getById:function(a,b){c.get({addressId:a},function(a){b(a)})},getByUserId:function(a,b){c.getByUserId({userId:a},function(a){b(a[0])})},createNew:function(a,b){var d=new c;d.userId=a,b(d)},save:function(a,b){var c=angular.copy(a);c.$save().then(function(a){b(a)})},update:function(a,b){var c=angular.copy(a);c._id=void 0,c.$update({addressId:a._id}).then(function(){b()})},remove:function(a,b){var c=angular.copy(a);c._id=void 0,c.$remove({addressId:a._id}).then(function(){b()})}}}]),angular.module("segoraClientApp").service("CredentialService",["$resource","Settings","md5",function(a,b,c){var d=a(b.backendHost+"/collections/credential/:credentialId",{credentialId:"@_id"},{save:{method:"POST",isArray:!0},update:{method:"PUT"},getByUserId:{method:"GET",isArray:!0}});return{getById:function(a,b){d.get({credentialId:a},function(a){b(a)})},getByUserId:function(a,b){d.getByUserId({userId:a},function(a){b(a[0])})},createNew:function(a,b){var c=new d;c.userId=a,b(c)},save:function(a,b){var d=angular.copy(a);delete d.confirmPassword,d.password=c.createHash(d.password),d.$save().then(function(a){b(a)})},update:function(a,b){var d=angular.copy(a);delete d._id,delete d.confirmPassword,d.password=c.createHash(d.password),d.$update({credentialId:a._id}).then(function(){b()})},remove:function(a,b){var c=angular.copy(a);delete c._id,c.$remove({credentialId:a._id}).then(function(){b()})}}}]),angular.module("segoraClientApp").controller("UserPaymentsCtrl",["$scope","$location","data",function(a,b,c){a.user=c.user,a.payments=c.payments,a.currentYear=c.currentYear;var d=c.page;a.rowCount=c.rowCount,a.next=function(){d++,b.search("page",d),b.path("/user/"+a.user._id+"/payment")},a.previous=function(){d--,b.search("page",d),b.path("/user/"+a.user._id+"/payment")},a.showNext=function(){return a.payments.length==a.rowCount?!0:!1},a.showPrevious=function(){return 1>=d?!1:!0}}]),angular.module("segoraClientApp").service("PaymentService",["$resource","Settings",function(a,b){var c=a(b.backendHost+"/collections/payment/:paymentId",{paymentId:"@_id"},{save:{method:"POST",isArray:!0},update:{method:"PUT"},getByUserId:{method:"GET",isArray:!0}});return{getById:function(a,b){c.get({paymentId:a},function(a){b(a)})},getByUserId:function(a,b,d,e){var f=b,g=d;c.getByUserId({userId:a,limit:f,skip:g*f-f},function(a){e(a)})},getByUserIdAndYear:function(a,b,d){c.getByUserId({userId:a,year:b,limit:12,skip:0},function(a){d(a)})},createNew:function(a,b){var d=new c;d.userId=a,b(d)},save:function(a,b){var c=angular.copy(a);c.$save().then(function(a){b(a)})},update:function(a,b){var c=angular.copy(a);c._id=void 0,c.$update({paymentId:a._id}).then(function(){b()})},remove:function(a,b){this.getById(a,function(a){a.$remove().then(function(){b()})})}}}]),angular.module("segoraClientApp").service("StatusService",["$rootScope",function(a){return{"default":function(){$("#progressBarModal").modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove(),a.progressActive="progress-success"},start:function(){$("body").addClass("modal-open"),$("#progressBarModal").modal("show"),a.progressActive="progress-striped active progress-warning"},stop:function(){$("#progressBarModal").modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove(),a.progressActive="progress-success"},error:function(){$("#progressBarModal").modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove(),a.progressActive=""}}}]),angular.module("segoraClientApp").factory("FlashService",["$rootScope",function(a){var b=[],c="",d="";return a.$on("$routeChangeSuccess",function(){a.$broadcast("displayMessage")}),a.$on("displayMessage",function(){c=b.shift()||""}),{setMessage:function(c,e,f){b.push(c),d=e,f&&a.$broadcast("displayMessage")},getMessage:function(){return c},clearMessages:function(){return b=[]},getType:function(){return d}}}]),angular.module("segoraClientApp").factory("SessionService",function(){return{get:function(a){return sessionStorage.getItem(a)},set:function(a,b){return sessionStorage.setItem(a,b)},unset:function(a){return sessionStorage.removeItem(a)}}}),angular.module("segoraClientApp").factory("UserSessionService",["SessionService","md5",function(a,b){return{hasSession:function(){return a.get("login")?!0:!1},createSession:function(c,d){a.set("login","true"),a.set("username",c),a.set("hash",b.createHash(d))},addRoles:function(b){a.set("roles",JSON.stringify(b))},addUser:function(b){a.set("user",JSON.stringify(b))},removeSession:function(){a.unset("login"),a.unset("username"),a.unset("hash"),a.unset("roles"),a.unset("user")},getHash:function(){return a.get("hash")},getUsername:function(){return a.get("username")},getUser:function(){return JSON.parse(a.get("user"))},hasAnyRoles:function(b){var c=!1,d=a.get("roles");if("undefined"!=d){var e=JSON.parse(a.get("roles"));e&&e.forEach(function(a){for(var d=0;d<b.length;d++)b[d]==a&&(c=!0)})}return c}}}]),angular.module("segoraClientApp").service("CounterService",["$resource","Settings",function(a,b){var c=a(b.backendHost+"/next",{},{next:{method:"GET"}});return{next:function(a,b){var d=this;c.next({name:a},function(c){void 0==c.seq?(console.log("no counter. recalling..."),d.next(a,b)):b(c)})}}}]),angular.module("segoraClientApp").factory("GroupService",["$resource","$http","Settings",function(a,b,c){var d=a(c.backendHost+"/collections/group/:groupId",{groupId:"@id"},{save:{method:"POST",isArray:!0},update:{method:"PUT"}});return{list:function(a){var b=d.query(function(){a(b)},function(a){console.log(a)})},getById:function(a,b){d.get({groupId:a},function(a){b(a)})},createNew:function(a){a(new d)},save:function(a,b){var c=angular.copy(a);c.$save().then(function(a){b(a)})},update:function(a,b){var c=angular.copy(a);c._id=void 0,c.$update({groupId:a._id,test:!0}).then(function(){b()})},remove:function(a,b){var c=angular.copy(a);c._id=void 0,c.$remove({groupId:a._id}).then(function(){b()})}}}]),angular.module("segoraClientApp").factory("RoleService",["$resource","$http","Settings",function(a,b,c){var d=a(c.backendHost+"/collections/role/:roleId",{roleId:"@id"},{save:{method:"POST",isArray:!0},update:{method:"PUT"}});return{list:function(a){var b=d.query(function(){a(b)},function(a){console.log(a)})},getById:function(a,b){d.get({roleId:a},function(a){b(a)})},createNew:function(a){a(new d)},save:function(a,b){var c=angular.copy(a);c.$save().then(function(a){b(a)})},update:function(a,b){var c=angular.copy(a);c._id=void 0,c.$update({roleId:a._id,test:!0}).then(function(){b()})},remove:function(a,b){var c=angular.copy(a);c._id=void 0,c.$remove({groupId:groupData._id}).then(function(){b()})}}}]),angular.module("segoraClientApp").controller("UserPaymentDetailCtrl",["$scope","$location","PaymentService","data",function(a,b,c,d){a.user=d.user,a.payment=d.payment,a.paymentId=d.paymentId,a.editMode="new"==a.paymentId?!0:!1,a.edit=function(){a.editMode=!0},a.done=function(){a.editMode=!1},a.save=function(){a.payment._id?(a.payment._id=void 0,a.payment.$update({paymentId:paymentId,test:!0},function(){b.path("/user/"+a.user._id+"/payment")})):c.save(a.payment,function(){b.path("/user/"+a.user._id+"/payment")})},a.remove=function(){a.payment.$remove({paymentId:a.paymentId},function(){b.path("/user/"+a.user._id+"/payment")})}}]),angular.module("segoraClientApp").controller("UserMonthlyPaymentCtrl",["$scope","$location","CounterService","PaymentService","StatusService","FlashService","UserSessionService","UserService","AddressService","data",function(a,b,c,d,e,f,g,h,i,j){a.months=j.months,a.years=j.years,a.userId=j.userId,a.user=j.user,a.selectedYear=j.selectedYear,a.payments=j.payments,a.paymentsToProcess=[],a.currentUser=g.getUser(),a.changeYear=function(){b.path("/user/"+a.userId+"/monthly_payment/"+a.selectedYear)},a.done=function(){return b.path("/user/"+a.userId)},a.save=function(){e.start(),a.months.forEach(function(b){b.checked&&!b.disabled&&a.paymentsToProcess.push(b)});var g=a.paymentsToProcess.length,h=0;a.paymentsToProcess.forEach(function(e){d.createNew(a.userId,function(i){i.year=a.selectedYear,i.month=e.number,i.amount=80,c.next("payment_"+i.year+"_"+i.month,function(c){i.creator_id=a.currentUser._id,i.created_date=(new Date).getTime(),i.referenceNumber=i.year+a.padding(i.month,"0",2)+a.padding(c.seq.toString(),"0",3),d.save(i,function(){h++,g==h&&(b.search("refresh",(new Date).getTime()),b.path("/user/"+a.userId+"/monthly_payment/"+a.selectedYear),f.setMessage("Saved.","success"))})})})})},a.padding=function(a,b,c){for(var d=a;d.length<c;)d=b+d;return d},a.remove=function(c){e.start(),d.remove(c,function(){b.search("refresh",(new Date).getTime()),b.path("/user/"+a.userId+"/monthly_payment/"+a.selectedYear),f.setMessage("Removed.","success")})},a.showPayment=function(b){a.currentPayment=b,h.getById(b.payment.creator_id,function(b){a.currentPayment.payment.creator=b}),i.getByUserId(a.user._id,function(b){a.address=b})}}]),angular.module("segoraClientApp").directive("userTab",["$location","AddressService","CredentialService",function(a,b,c){return{restrict:"E",templateUrl:"views/templates/user-tab.html",scope:{user:"=",activeTab:"@"},link:function(d){b.getByUserId(d.user._id,function(a){d.address=a,d.addressId=a?a._id:null}),c.getByUserId(d.user._id,function(a){d.credential=a,d.credentialId=a?a._id:null}),d.getAddressId=function(){return null!==d.address&&d.address?d.address._id:"null"},d.getCredentialId=function(){return null!==d.credential&&d.credential?d.credential._id:"null"},d.currentYear=(new Date).getFullYear(),d.getCurrentYear=function(){return d.currentYear},d.getUserLink=function(){return void 0!==d.user._id?"#/user/"+d.user._id:"#"+a.path()},d.getAddressLink=function(){return void 0!==d.user._id?"#/user/"+d.user._id+"/address/"+d.getAddressId():"#"+a.path()},d.getRolesLink=function(){return void 0!==d.user._id?"#/user/"+d.user._id+"/roles":"#"+a.path()},d.getCredentialLink=function(){return void 0!==d.user._id?"#/user/"+d.user._id+"/credential/"+d.getCredentialId():"#"+a.path()},d.getPaymentLink=function(){return void 0!==d.user._id&&void 0!==d.address?"#/user/"+d.user._id+"/monthly_payment/"+d.getCurrentYear():"#"+a.path()},d.isActive=function(a){var b="";return void 0==d.user._id&&(b="disabled"),"payments"==a&&void 0==d.address&&(b="disabled"),d.activeTab==a?"active "+b:""+b},d.isDisabled=function(){}}}}]),angular.module("segoraClientApp").directive("message",["FlashService",function(a){return{templateUrl:"views/templates/message.html",restrict:"E",link:function(b){b.flash=a,b.getAlertType=function(){return""!==a.getMessage()?"alert alert-"+a.getType():""}}}}]),angular.module("segoraClientApp").controller("LoginCtrl",["$scope","$http","$location","Settings","StatusService","FlashService","UserSessionService","UserService",function(a,b,c,d,e,f,g,h){a.login=function(){e.start(),b({method:"POST",data:a.credential,url:d.backendHost+"/authenticate"}).success(function(){g.createSession(a.credential.username,a.credential.password),h.getByUsername(a.credential.username,function(a){g.addRoles(a.userRoles),g.addUser(a),c.path("/")})}).error(function(){e.stop(),f.setMessage("Unauthorized!","danger",!0)})}}]),angular.module("segoraClientApp").run(["$rootScope","$location","UserSessionService","StatusService","FlashService",function(a,b,c,d,e){var f=["/home","/login"];a.$on("$routeChangeStart",function(){var a=!1;f.some(function(c){return b.absUrl().lastIndexOf(c)>0?(a=!0,!0):!1}),a||c.hasSession()||(b.path("/login"),d.stop(),e.setMessage("Please log in to continue.","danger"))}),a.hasAnyRoles=c.hasAnyRoles}]),angular.module("segoraClientApp").directive("mainMenu",["$location","UserSessionService","StatusService",function(a,b,c){return{templateUrl:"views/templates/main-menu.html",restrict:"E",link:function(d){d.isLogin=function(){return b.hasSession()},d.logout=function(){c.start(),b.removeSession(),a.search("logout_time",(new Date).getTime()),a.path("/home")}}}}]),angular.module("segoraClientApp").directive("ngConfirmClick",function(){return{link:function(a,b,c){var d=c.ngConfirmClick||"Are you sure?",e=c.confirmedClick;b.bind("click",function(){window.confirm(d)&&a.$eval(e)})}}}),angular.module("segoraClientApp").config(["$httpProvider","$provide",function(a,b){b.factory("digestInterceptor",["$q","$injector","md5","DigestHttp","Settings","UserSessionService",function(a,b,c,d,e,f){return{request:function(a){return a},requestError:function(b){return a.reject(b)},response:function(a){return a},responseError:function(g){if(g.config.headers.Authorization)return a.reject(g);var h=g.config.url.substring(e.backendHost.length,g.config.url.length),i=new d(b.get("$http"),c);i.setUserName(f.getUsername()),i.setPassword(f.getHash());var j=i.call(g.config.method,e.backendHost,h,g.config.data,g.headers,g.config.params);return j}}}]),a.interceptors.push("digestInterceptor")}]);var DigestHttpClass=function(a,b){this.userName=null,this.password=null,this.response=null,this.cnonce="acegi",this.nc="00000001",this.authorizationHeader="Authorization",this.wwwAuthenticationHeader="WWW-Authenticate",this.successFn=null,this.errorFn=null,this.$http=a,this.md5=b,this.setUserName=function(a){this.userName=a},this.setPassword=function(a){this.password=a},this.call=function(a,b,c,d,e,f){var g=c;f&&(g+="?"+this.object2Params(f)),this.setAuthenticateHeader(e(this.wwwAuthenticationHeader));var h=this.getAuthenticateHeaderParam("nonce"),i=this.getAuthenticateHeaderParam("realm"),j=this.getAuthenticateHeaderParam("qop"),k=this.calculateResponse(a,g,h,i,j),l=this.generateAuthorizationHeader(k,g);return e[this.authorizationHeader]=l,this.$http({method:a,url:b+g,data:d,headers:e})},this.object2Params=function(a,b){var c=[];for(var d in a){var e=b?b+"["+d+"]":d,f=a[e];c.push(angular.isObject(f)?qs(f,e):e+"="+encodeURIComponent(f))}return c.join("&")},this.setAuthenticateHeader=function(a){this.authenticateHeaderValue=a,this.authenticateHeaderParams=this.authenticateHeaderValue.split(",")},this.getAuthenticateHeaderParam=function(a){var b=null;return $.each(this.authenticateHeaderParams,function(c,d){d.indexOf(a)>0&&(b=d.split(a+"=")[1],b=b.substring(1,b.length-1))}),b},this.generateAuthorizationHeader=function(a,b){return this.authenticateHeaderValue+', username="'+this.userName+'", uri="'+b+'", response="'+a+'", nc='+this.nc+', cnonce="'+this.cnonce+'"'},this.calculateResponse=function(a,c,d,e,f){var g=a+":"+c,h=b.createHash(g),i=b.createHash(this.userName+":"+e+":"+this.password),j=i+":"+d+":"+this.nc+":"+this.cnonce+":"+f+":"+h;return b.createHash(j)}};angular.module("segoraClientApp").service("DigestHttp",[function(){return DigestHttpClass}]),angular.module("segoraClientApp").controller("GroupCtrl",["$scope","data",function(a,b){a.groups=b.groups}]),angular.module("segoraClientApp").controller("GroupDetailCtrl",["$scope","$route","$location","$http","GroupService","StatusService","FlashService","data",function(a,b,c,d,e,f,g,h){a.groupId=h.groupId,a.group=h.group,a.users=h.users,a.admins=h.admins,a.selectedUsers=h.selectedUsers,a.selectedAdmins=h.selectedAdmins,a.editMode="new"==a.groupId?!0:!1,a.edit=function(){a.editMode=!0},a.done=function(){a.editMode?a.editMode=!1:c.path("/group")};var i=function(){var b=[],c=[];a.selectedUsers.forEach(function(a){b.push(a._id)}),a.group.selectedUsers=b,a.selectedAdmins.forEach(function(a){c.push(a._id)}),a.group.selectedAdmins=c};a.save=function(){return a.groupForm.$valid?(f.start(),void(a.group._id?(i(),e.update(a.group,function(){a.editMode=!1,f.stop(),g.setMessage("Updated.","success",!0)})):(i(),e.save(a.group,function(a){c.path("/group/"+a[0]._id),g.setMessage("Saved.","success")})))):(g.setMessage("Not valid","danger",!0),!1)},a.remove=function(){f.start(),e.remove(a.group,function(){c.path("/group"),g.setMessage("Removed.","success")})},a.chooseUser=function(b){for(var c=a.users.length-1;c>=0;c--)a.users[c]._id===b&&(a.selectedUsers.push(angular.copy(a.users[c])),a.users.splice(c,1))},a.chooseAdmin=function(b){for(var c=a.admins.length-1;c>=0;c--)a.admins[c]._id===b&&(a.selectedAdmins.push(angular.copy(a.admins[c])),a.admins.splice(c,1))},a.removeUser=function(b){for(var c=a.selectedUsers.length-1;c>=0;c--)a.selectedUsers[c]._id===b&&(a.users.push(angular.copy(a.selectedUsers[c])),a.selectedUsers.splice(c,1))},a.removeAdmin=function(b){for(var c=a.selectedAdmins.length-1;c>=0;c--)a.selectedAdmins[c]._id===b&&(a.admins.push(angular.copy(a.selectedAdmins[c])),a.selectedAdmins.splice(c,1))}}]),angular.module("segoraClientApp").controller("RoleCtrl",["$scope","data",function(a,b){a.roles=b.roles}]),angular.module("segoraClientApp").controller("RoleDetailCtrl",["$scope","$route","$location","$http","RoleService","StatusService","FlashService","data",function(a,b,c,d,e,f,g,h){a.roleId=h.roleId,a.role=h.role,a.editMode="new"==a.roleId?!0:!1,a.edit=function(){a.editMode=!0},a.done=function(){a.editMode?a.editMode=!1:c.path("/role")},a.save=function(){return a.roleForm.$valid?(f.start(),void(a.role._id?e.update(a.role,function(){a.editMode=!1,f.stop(),g.setMessage("Updated.","success",!0)}):e.save(a.role,function(a){c.path("/role/"+a[0]._id),g.setMessage("Saved.","success")}))):(g.setMessage("Not valid","danger",!0),!1)},a.remove=function(){f.start(),e.remove(a.role,function(){c.path("/role"),g.setMessage("Removed.","success")})}}]),angular.module("segoraClientApp").controller("UserRoleDetailCtrl",["$scope","$location","UserService","RoleService","StatusService","FlashService","data",function(a,b,c,d,e,f,g){a.user=g.user,a.roles=g.roles,a.userRoles=g.userRoles,a.editMode=!1,a.edit=function(){a.editMode=!0},a.done=function(){a.editMode?a.editMode=!1:b.path("/user/"+a.user._id)},a.save=function(){return a.userRolesForm.$valid?(e.start(),a.user.userRoles=[],a.userRoles=[],a.roles.forEach(function(b){b.selected&&(a.user.userRoles.push(b.code),a.userRoles.push(b))}),void c.update(a.user,function(){a.editMode=!1,e.stop(),f.setMessage("Updated.","success",!0)})):(f.setMessage("Not valid","danger",!0),!1)},a.chooseRole=function(b){a.roles.forEach(function(a){b==a.code&&(a.selected?delete a.selected:a.selected=!0)})}}]);