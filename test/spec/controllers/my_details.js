'use strict';

describe('Controller: MyDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('segoraClientApp'));

  var MyDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyDetailsCtrl = $controller('MyDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
