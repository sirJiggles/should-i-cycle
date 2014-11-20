'use strict';

/**
 * @ngdoc function
 * @name shouldICycleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shouldICycleApp
 */
angular.module('shouldICycleApp')
	.controller('MainCtrl', function ($scope, worldWeatherOnline, userData) {

	  	// get the local storage data
	  	$scope.data = userData.getData();

	  	console.log($scope.data);

	    
	    // the get weather function
	  	$scope.getWeather = function(postcode) {
	  		// set the weather data using the world weather online service
			worldWeatherOnline.getPostCodeData(postcode).then(function(data){
		        $scope.weatherData = data;
		  	});
	      
  		};

	    $scope.registerUser = function() {
	    	$scope.data = userData.registerUser($scope.name, $scope.postCode);
	    	console.log($scope.data);
	    };
  	
  	});
