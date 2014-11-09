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
  		// set the weather data using the world weather online service
  		worldWeatherOnline.getPostCodeData(postcode).then(function(data){
  			$scope.weatherData = data;
		});
  	};
  	
  });
