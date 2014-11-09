'use strict';

describe('Service: metOfficeApi', function () {

  // load the service's module
  beforeEach(module('canIcycleApp'));

  // instantiate service
  var metOfficeApi;
  beforeEach(inject(function (_metOfficeApi_) {
    metOfficeApi = _metOfficeApi_;
  }));

  it('should do something', function () {
    expect(!!metOfficeApi).toBe(true);
  });

});
