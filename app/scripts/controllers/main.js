'use strict';

/**
 * @ngdoc function
 * @name canIcycleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the canIcycleApp
 */
angular.module('canIcycleApp')
  .controller('MainCtrl', function ($scope, worldWeatherOnline) {

  
  	$scope.getWeather = function(postcode) {
  		var encodedPostCode = encodeURIComponent(postcode);
  		// set the weather data using the world weather online service
  		$scope.weatherData = worldWeatherOnline.getPostCodeData(encodedPostCode);

  		console.log($scope.weatherData);
  	};
  	
  });
