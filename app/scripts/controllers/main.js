'use strict';

/**
 * @ngdoc function
 * @name shouldICycleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shouldICycleApp
 */
angular.module('shouldICycleApp')
	.controller('MainCtrl', function ($scope, worldWeatherOnline, userData, $location, growl) {
		
	  	// get the local storage data
	  	$scope.data = userData.getData();

	  	// so we know what button to show on the reg form
	  	$scope.register = true;

	  	//function to save weather
	  	$scope.saveWeather = function() {
	  		worldWeatherOnline.getPostCodeData(userData.getPostCode()).then(function(data) {
				userData.saveWeather(data);
				$location.path('/');
				growl.success('Weather data updated');
			});
	  	};

	  	/* 
	  	data
			weather
	  			maxtempC : string num
	  			mintempC: string num
	  			hourly: []
					0 - 7
						time: string num (0, 300, 600, 900, 1200, 1500, 1800, 2100)
						tempC: string num
						weatherDesc[0].value
						windspeedMiles: string num
		*/



  		// check the last time we got the weather, if it was more than three hours ago or not at all then get it again
  		if(userData.getRegistered()) {
			var lastTime = userData.getLastWeatherTime();
			if(lastTime) {
				var now = new Date().getTime(),
					diff = now - lastTime;
					// if three hours passed
					if (diff > 10800000) {
						$scope.saveWeather();
					}
			} else {
				$scope.saveWeather();
			}
  		}

  	});
