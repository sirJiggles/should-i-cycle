'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('shouldICycleApp'));

    // Initialize the controller and set up the dependancies
    beforeEach(inject(function ($controller, $rootScope, $httpBackend, _worldWeatherOnline_, _userData_) {
        this.scope = $rootScope.$new();
        this.$httpBackend = $httpBackend;
        this.worldWeatherOnline = _worldWeatherOnline_;
        this.userData = _userData_;
        this.dummyWeatherData = {data:{weather:['day1','day2','day3','day4','day5']}};
        $controller('MainCtrl', {
            $scope: this.scope,
            userData: _userData_,
            worldWeatherOnline: _worldWeatherOnline_
        });
    }));


    it('should call the get post code data function', function(){

        this.$httpBackend.expectGET('http://api.worldweatheronline.com/free/v2/weather.ashx?q=PE29%202BN&format=json&num_of_days=5&key=39599866ca63e00d5c52e853caeb2').respond(this.dummyWeatherData);

        spyOn(this.worldWeatherOnline, 'getPostCodeData').and.callThrough();

        // run the get weather function in the controller
        this.scope.getWeather('PE29 2BN');

        this.$httpBackend.flush();

        this.scope.$root.$digest();

        expect(this.worldWeatherOnline.getPostCodeData).toHaveBeenCalled();

    });

    
    it('should be able to get data from the weather service API', function() {

        this.$httpBackend.expectGET('http://api.worldweatheronline.com/free/v2/weather.ashx?q=PE29%202BN&format=json&num_of_days=5&key=39599866ca63e00d5c52e853caeb2').respond(this.dummyWeatherData);

        this.scope.getWeather('PE29 2BN');

        this.$httpBackend.flush();

        this.scope.$root.$digest();

        expect(this.scope.weatherData.data).toBeDefined();
        // should have first day of weather
        expect(this.scope.weatherData.data.weather[0]).toBeDefined();
        
        // should have last day of weather
        expect(this.scope.weatherData.data .weather[4]).toBeDefined();
        
    });

});
    