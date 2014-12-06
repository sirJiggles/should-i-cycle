'use strict';

/**
 * @ngdoc function
 * @name shouldICycleApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the shouldICycleApp
 */
angular.module('shouldICycleApp')
	.controller('SettingsCtrl', function ($scope, userData) {
		
	  	// get the local storage data
	  	$scope.data = userData.getData();

	  	// so we know what button to show on the reg form
	  	$scope.settings = true;
	  	$scope.name = userData.getName();
	  	$scope.postCode = userData.getPostCode();

  	});
