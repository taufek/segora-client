'use strict';

/**
 * @ngdoc service
 * @name segoraClientApp.AddressService
 * @description
 * # AddressService
 * Service in the segoraClientApp.
 */
angular.module('segoraClientApp')
  .service('AddressService', function AddressService() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var Address = $resource(
      'http://segora-services.herokuapp.com/collections/address/:addressId', 
      {userId:'@id'},
      {
        'save': {method : 'POST', isArray: true},
        'update': {method : 'PUT'}
      }
    );

    var getById =  function(id, fn) {
        Address.get({userId:id}, function(user) {
          fn(user);
       });
    }
      
    var createNew = function(fn){
        fn(new Address());
    }

    var save = function(addressData, fn){
        var address = angular.copy(addressData);
        address.$save()
          .then(function(o, res){
            fn();
          });
    }
  });
