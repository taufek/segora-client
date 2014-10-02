'use strict';

describe('Controller: UserUploadCtrl', function () {

  // load the controller's module
  beforeEach(module('segoraClientApp'));

  var UserUploadCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserUploadCtrl = $controller('UserUploadCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
