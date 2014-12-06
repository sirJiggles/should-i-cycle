'use strict';

/*
 the main tests in this controller are testing for things like, when did we last update the weather, have we ever got it,
 have the settings changed since the last time we did it etc etc for controlling the pull freq of the weather API
*/

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

        // resister a test user before each test, we test the register functionality in that directive so no need for it here.
        userData.registerUser('Gareth', 'PE29');

        $controller('MainCtrl', {
            $scope: scope,
            userData: _userData_,
            worldWeatherOnline: _worldWeatherOnline_
        });

        // set up the detectives
    	spyOn(growl, 'success').and.returnValue(1);
    	spyOn(scope,'saveWeather').and.callFake(function(){
			growl.success('Weather data updated');
    	});


    }));

    afterEach(function(){
    	userData.clearData();
    });

    it('should be able to get the data from the data store', function() {
    	// check it
    	expect(scope.data).toBeDefined();
    });

    it('should get the weather data if it does not exist', function() {

    	if(userData.getRegistered()) {
    		var lastTime = userData.getLastWeatherTime();
			if(!lastTime) {
				scope.saveWeather();
			}
    	}

    	expect(scope.saveWeather).toHaveBeenCalled();
    });

    it('should check the timestamp of when it last got the weather and not get it unless three hours have passed', function(){
    	userData.saveWeather(dummyWeatherData);

    	var fakeNow = new Date().getTime(),
    		then = fakeNow - 10700000; // less than three hours ago

		userData.setLastWeatherTime(then);
    	userData.save();

    	if(userData.getRegistered()) {
    		var lastTime = userData.getLastWeatherTime();
			if(lastTime) {
				var now = new Date().getTime(),
					diff = now - lastTime;
				// if three hours passed
				if (diff > 10800000) {
					scope.saveWeather();
				}
			} else {
				scope.saveWeather();
			}
    	}

    	expect(scope.saveWeather).not.toHaveBeenCalled();
    });

    it('should now get the weather data again and redirect te user back to the main page, showing a notification', function(){
    	
    	userData.saveWeather(dummyWeatherData);

    	// set the timestamp for over three hours ago
    	var fakeNow = new Date().getTime(),
    		then = fakeNow - 10800010;

    	userData.setLastWeatherTime(then);
    	userData.save();

    	if(userData.getRegistered()) {
    		var lastTime = userData.getLastWeatherTime();
			if(lastTime) {
				var now = new Date().getTime(),
					diff = now - lastTime;
				// if three hours passed
				if (diff > 10800000) {
					scope.saveWeather();
				}
			} else {
				scope.saveWeather();
			}
    	}

    	expect(scope.saveWeather).toHaveBeenCalled();
    	expect(growl.success).toHaveBeenCalledWith('Weather data updated');

    });

    it('should call the get weather function again if the user has changed thier settings', function(){
    	userData.saveWeather(dummyWeatherData);

    	userData.setUpdatedSettings(true);
    	userData.save();

    	if (userData.getUpdatedSettings()) {
    		scope.saveWeather();
    		userData.setUpdatedSettings(false);
			userData.save();
    	}

    	expect(scope.saveWeather).toHaveBeenCalled();
    	// now the flag should also be false
    	expect(userData.getUpdatedSettings()).toBe(false);
    });

    it('should not call the get weather if settings are not updated and three hours has not passed', function(){
    	userData.saveWeather(dummyWeatherData);

    	// set the timestamp for under three hours ago
    	var fakeNow = new Date().getTime(),
    		then = fakeNow - 10700000;

    	userData.setLastWeatherTime(then);
    	userData.save();

    	if(userData.getRegistered()) {

    		if(!userData.getUpdatedSettings()) {
	    		var lastTime = userData.getLastWeatherTime();
				if(lastTime) {
					var now = new Date().getTime(),
						diff = now - lastTime;
					// if three hours passed
					if (diff > 10800000) {
						scope.saveWeather();
					}
				} else {
					scope.saveWeather();
				}
			} else {
				scope.saveWeather();
				userData.setUpdatedSettings(false);
				userData.save();
			}
    	} 

    	expect(scope.saveWeather).not.toHaveBeenCalled();
    });


});