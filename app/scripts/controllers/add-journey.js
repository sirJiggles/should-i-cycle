'use strict';

/**
 * @ngdoc function
 * @name shouldICycleApp.controller:AddJourneyCtrl
 * @description
 * # AddJourneyCtrl
 * Controller of the shouldICycleApp
 */
angular.module('shouldICycleApp')
	.controller('AddJourneyCtrl', function ($scope, userData) {
		// get the stored data for the user
		$scope.data = userData.getData();
		$scope.formMode = 'add';
  	});
