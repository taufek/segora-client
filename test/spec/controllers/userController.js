'use strict';

describe('Controller: UserControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('segoraClientApp'));

  var UserControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserControllerCtrl = $controller('UserControllerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
