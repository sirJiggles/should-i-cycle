'use strict';

describe('Service: worldWeatherOnline', function () {

  // load the service's module
  beforeEach(module('canIcycleApp'));

  // instantiate service
  var worldWeatherOnline;
  beforeEach(inject(function (_worldWeatherOnline_) {
    worldWeatherOnline = _worldWeatherOnline_;
  }));

  it('should do something', function () {
    expect(!!worldWeatherOnline).toBe(true);
  });

});
