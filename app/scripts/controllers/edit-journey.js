'use strict';

/**
 * @ngdoc function
 * @name shouldICycleApp.controller:EditJourneyCtrl
 * @description
 * # EditJourneyCtrl
 * Controller of the shouldICycleApp
 */
angular.module('shouldICycleApp')
	.controller('EditJourneyCtrl', function ($scope, userData, $routeParams, $location, growl) {
		// get the stored data for the user
		$scope.data = userData.getData();

		// of we have an id set the mode for the shared directive
		if ($routeParams.id) {
			$scope.formMode = 'edit';
		} else {
			$location.path('/');
			growl.warning('An ID is needed to edit a journey.', {title: 'Warning'});
		}

  	});
