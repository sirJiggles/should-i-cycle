'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('shouldICycleApp'));

    var userData,
    	worldWeatherOnline,
    	scope,
    	growl,
    	$location,
    	dummyWeatherData = {
    		data:{
    			weather:[{
					maxTempC: '10',
					minTempC: '3',
					hourly: [1,2,3,4,5]
    			}]
			}
		};


    // Initialize the controller and set up the dependancies
    beforeEach(inject(function ($controller, $rootScope, _worldWeatherOnline_, _userData_, _$location_, _growl_) {
        scope = $rootScope.$new();
        worldWeatherOnline = _worldWeatherOnline_;
        userData = _userData_;
        $location = _$location_;
        growl = _growl_;

        userData.registerUser('Gareth', 'PE29');
	
        $controller('MainCtrl', {
            $scope: scope,
            userData: _userData_,
            worldWeatherOnline: _worldWeatherOnline_
        });

    }));

    afterEach(function(){
    	userData.clearData();
    });

    it('should be able to get the data from the data store', function() {
    	spyOn(scope,'saveWeather').and.callFake(function(){
        	return 'nothing';
        });
    	// check it
    	expect(scope.data).toBeDefined();
    });

    it('should get the weather data if it does not exist', function() {
	 	spyOn(scope,'saveWeather').and.callFake(function(){
        	return 'nothing';
        });
    	expect(scope.saveWeather).toHaveBeenCalled();
    });

    it('should check the timestamp of when it last got the weather and not get it unless three hours have passed', function(){
    	spyOn(scope,'saveWeather').and.callFake(function(){
        	return 'nothing';
        });
    	userData.saveWeather(dummyWeatherData);
    	expect(scope.saveWeather).toHaveBeenCalled().toBe(false);
    });

    it('should now get the weather data again and redirect te user back to the main page, showing a notification', function(){
    	
    	userData.saveWeather(dummyWeatherData);
    	spyOn(scope,'saveWeather').and.callFake(function(){
        	return 'nothing';
        });

    	spyOn($location, 'path');
    	spyOn(growl, 'success').and.returnValue(1);

    	// set the timestamp for over three hours ago
    	var now = new Date().getTime(),
    		then = now - 10800010;

    	userData.setLastWeatherTime(then);
    	userData.save();

    	expect(scope.saveWeather).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/');
    	expect(growl.success).toHaveBeenCalledWith('Weather data updated');

    });


});
    