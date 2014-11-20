'use strict';

/**
 * @ngdoc service
 * @name shouldICycleApp.worldWeatherOnline
 * @description
 * # worldWeatherOnline
 * Service in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.service('worldWeatherOnline', function ($http, $log, $q) {
		

		// api end point and key can be used for various calls
		var APIEndPoint = 'http://api.worldweatheronline.com/free/v2/weather.ashx?q=',
			APIKey = '39599866ca63e00d5c52e853caeb2';

		// get weather for postCode
		this.getPostCodeData = function(postCode) {
			// uri encode the post code for the API
			var encodedPostCode = encodeURIComponent(postCode);

			// create our own promise for the http get :D
			var deferred = $q.defer();

			$http.get(APIEndPoint+encodedPostCode+'&format=json&num_of_days=5&key='+APIKey).
				success(function(data) { 
				  	deferred.resolve(data);
				}).error(function(msg, code) {
				  	deferred.reject(msg);
				  	$log.error(msg, code);
				});
				
			return deferred.promise;
		};

  	});
