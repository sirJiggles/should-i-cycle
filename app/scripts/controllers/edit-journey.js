'use strict';

/**
 * @ngdoc function
 * @name shouldICycleApp.controller:EditJourneyCtrl
 * @description
 * # EditJourneyCtrl
 * Controller of the shouldICycleApp
 */
angular.module('shouldICycleApp')
	.controller('EditJourneyCtrl', function ($scope, userData) {
		// get the stored data for the user
		$scope.data = userData.getData();
		$scope.formMode = 'edit';
  	});
