'use strict';

/**
 * @ngdoc service
 * @name canIcycleApp.worldWeatherOnline
 * @description
 * # worldWeatherOnline
 * Service in the canIcycleApp.
 */
angular.module('canIcycleApp')
	.service('worldWeatherOnline', function ($http) {
		

		var APIEndPoint = 'http://api.worldweatheronline.com/free/v2/weather.ashx?q=',
			APIKey = '39599866ca63e00d5c52e853caeb2';

		// get weather for postCode
		this.getPostCodeData = function(postCode) {
			$http.get(APIEndPoint+postCode+'&format=json&num_of_days=5&key='+APIKey)
					.success(function(data) {
						return data;
        			});
			
		};

  	});
