'use strict';

/**
 * @ngdoc function
 * @name shouldICycleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shouldICycleApp
 */
angular.module('shouldICycleApp')
  .controller('MainCtrl', function ($scope, worldWeatherOnline) {

  
  	$scope.getWeather = function(postcode) {
  		// set the weather data using the world weather online service
  		worldWeatherOnline.getPostCodeData(postcode).then(function(data){
  			$scope.weatherData = data;
		});
  	};
  	
  });
