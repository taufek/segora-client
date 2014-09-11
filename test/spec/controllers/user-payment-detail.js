'use strict';

describe('Controller: UserPaymentDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('segoraClientApp'));

  var UserPaymentDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserPaymentDetailCtrl = $controller('UserPaymentDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
