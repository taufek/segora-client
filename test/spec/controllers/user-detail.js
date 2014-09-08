'use strict';

describe('Controller: UserDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('segoraClientApp'));

  var UserDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserDetailCtrl = $controller('UserDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
