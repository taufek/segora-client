'use strict';

describe('Service: AddressService', function () {

  // load the service's module
  beforeEach(module('segoraClientApp'));

  // instantiate service
  var AddressService;
  beforeEach(inject(function (_AddressService_) {
    AddressService = _AddressService_;
  }));

  it('should do something', function () {
    expect(!!AddressService).toBe(true);
  });

});
