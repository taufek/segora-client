'use strict';

describe('Controller: UserAddressDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('segoraClientApp'));

  var UserAddressDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserAddressDetailCtrl = $controller('UserAddressDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
