'use strict';
describe('Service: worldWeatherOnline', function () {

	// load the controller's module
    beforeEach(module('shouldICycleApp'));

    var $httpBackend,
    	worldWeatherOnline,
    	userData,
    	dummyWeatherData = {
    		data:{
    			weather:[{
					maxtempC: '10',
					mintempC: '3',
					hourly: [1,2,3,4,5]
    			}]
			}
		};

    // Initialize the controller and set up the dependancies
    beforeEach(inject(function (_$httpBackend_, _worldWeatherOnline_, _userData_) {
        $httpBackend = _$httpBackend_;
        worldWeatherOnline = _worldWeatherOnline_;
        userData = _userData_;
    }));

    it('should return false if there is no postcode sent to the getPostCodeData function called', function(){
    	var postCodeData = worldWeatherOnline.getPostCodeData();
    	expect(postCodeData).toBe(false);
    });

    it('should return false if there is a post code but its an empty string', function(){
    	var postCodeData = worldWeatherOnline.getPostCodeData('');
    	expect(postCodeData).toBe(false);
    });

    it('should call the get post code data function', function(){

        $httpBackend.expectGET('http://api.worldweatheronline.com/free/v2/weather.ashx?q=PE29%202BN&format=json&num_of_days=1&key=39599866ca63e00d5c52e853caeb2').respond(dummyWeatherData);
        spyOn(worldWeatherOnline, 'getPostCodeData').and.callThrough();

        // run the get weather function in the controller
        worldWeatherOnline.getPostCodeData('PE29 2BN');
        $httpBackend.flush();
        expect(worldWeatherOnline.getPostCodeData).toHaveBeenCalled();

    });

    
    it('should be able to get data from the weather service API', function() {
    	$httpBackend.expectGET('http://api.worldweatheronline.com/free/v2/weather.ashx?q=PE29%202BN&format=json&num_of_days=1&key=39599866ca63e00d5c52e853caeb2').respond(dummyWeatherData);
    	spyOn(worldWeatherOnline, 'getPostCodeData').and.callThrough();

        var weatherData = worldWeatherOnline.getPostCodeData('PE29 2BN');
        	
        $httpBackend.flush();

        var actualData = weatherData.$$state.value;

        expect(worldWeatherOnline.getPostCodeData).toHaveBeenCalled();
        expect(weatherData.$$state.status).toBe(1);
        expect(actualData.data).toBeDefined();
        expect(actualData.data.weather).toBeDefined();
        expect(actualData.data.weather[0].mintempC).toBeDefined();
        expect(actualData.data.weather[0].maxtempC).toBeDefined();
        expect(actualData.data.weather[0].hourly).toBeDefined();
        expect(actualData.data.weather[0].hourly[0]).toBeDefined();
        expect(actualData.data.weather[0].hourly[4]).toBeDefined();
    });
});