'use strict';

describe('Controller: UserMonthlyPaymentCtrl', function () {

  // load the controller's module
  beforeEach(module('segoraClientApp'));

  var UserMonthlyPaymentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserMonthlyPaymentCtrl = $controller('UserMonthlyPaymentCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
