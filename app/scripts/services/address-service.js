'use strict';

/**
 * @ngdoc service
 * @name segoraClientApp.AddressService
 * @description
 * # AddressService
 * Service in the segoraClientApp.
 */
angular.module('segoraClientApp')
  .service('AddressService', function ($resource) {
    var Address = $resource(
      'http://segora-services.herokuapp.com/collections/address/:addressId', 
      {addressId:'@_id'},
      {
        'save': {method : 'POST', isArray: true},
        'update': {method : 'PUT'}
      }
    );

    return {
    	getById : function(id, fn) {
	        Address.get({addressId:id}, function(address) {
	          fn(address);
	       	});
    	},      
	    createNew : function(userId, fn){
	    	var address = new Address();
	    	address.userId = userId;
	        fn(address);
	    },
	    save : function(addressData, fn){
	        var address = angular.copy(addressData);
	        address.$save()
	          .then(function(o, res){
	          	console.log(o);
	            fn(o);
	          });
    	}
    }
    
  });
