'use strict';

/**
 * @ngdoc function
 * @name shouldICycleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shouldICycleApp
 */
angular.module('shouldICycleApp')
	.controller('MainCtrl', function ($scope, worldWeatherOnline, userData, $location, growl, $route) {
		
	  	// get the local storage data
	  	$scope.data = userData.getData();

	  	// so we know what button to show on the reg form
	  	$scope.register = true;

	  	//function to save weather
	  	$scope.saveWeather = function() {
	  		worldWeatherOnline.getPostCodeData(userData.getPostCode()).then(function(data) {
	  			if(data.data.error) {
	  				growl.error(data.data.error[0].msg);
	  			} else {
					userData.saveWeather(data);
					growl.success('Weather data updated');
					$route.reload();
	  			}

			});
	  	};

  		// check the last time we got the weather, if it was more than three hours ago or not at all then get it again
  		if(userData.getRegistered()) {
  			if(!userData.getUpdatedSettings()) {
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
			} else {
				$scope.saveWeather();
				userData.setUpdatedSettings(false);
				userData.save();
			}
  		}

	  	

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



  	});
