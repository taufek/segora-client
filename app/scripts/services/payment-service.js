'use strict';

/**
 * @ngdoc service
 * @name segoraClientApp.PaymentService
 * @description
 * # PaymentService
 * Service in the segoraClientApp.
 */
angular.module('segoraClientApp')
  .service('PaymentService', function($resource) {
    var Payment = $resource(
      'http://segora-services.herokuapp.com/collections/payment/:paymentId', 
      {paymentId:'@_id'},
      {
        'save': {method : 'POST', isArray: true},
        'update': {method : 'PUT'},
        'getByUserId': {method : 'GET', isArray:true}
      }
    );

    return {
    	getById : function(id, fn) {
	        Payment.get({paymentId:id}, function(payment) {
	          fn(payment);
	       	});
    	},      
    	getByUserId : function(userId, fn) {
	        Payment.getByUserId({userId:userId}, function(payments) {
	          fn(payments);
	       	});
    	},      
	    createNew : function(userId, fn){
	    	var payment = new Payment();
	    	payment.userId = userId;
	        fn(payment);
	    },
	    save : function(paymentData, fn){
	        var payment = angular.copy(paymentData);
	        payment.$save()
	          .then(function(o, res){
	          	console.log(o);
	            fn(o);
	          });
    	}
    }
  });
