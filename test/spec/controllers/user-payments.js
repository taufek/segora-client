'use strict';

describe('Controller: UserPaymentsCtrl', function () {

  // load the controller's module
  beforeEach(module('segoraClientApp'));

  var UserPaymentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserPaymentsCtrl = $controller('UserPaymentsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
