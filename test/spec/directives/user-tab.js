'use strict';

describe('Directive: UserTab', function () {

  // load the directive's module
  beforeEach(module('segoraClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-user-tab></-user-tab>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the UserTab directive');
  }));
});
