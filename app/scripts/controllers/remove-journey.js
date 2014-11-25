'use strict';

/**
 * @ngdoc function
 * @name shouldICycleApp.controller:RemoveJourneyCtrl
 * @description
 * # RemoveJourneyCtrl
 * Controller of the shouldICycleApp
 */
angular.module('shouldICycleApp')
	.controller('RemoveJourneyCtrl', function ($scope, userData, $routeParams, $location, growl) {
		// get the stored data for the user
		$scope.data = userData.getData();

		var journey = userData.getJourney($routeParams.id);

		// if we have a journey update the bindings else redirect them home with a msg
		if (journey) {
			$scope.item = journey.name;
		}else {
			$location.path('/');
			growl.warning('Could not find a journey with that ID', {title: 'Warning'});
		}

		$scope.removeItem = function() {
			// for this remove markup we will run this function (thats why its in the controller)
			var removeAction = userData.removeJourney($routeParams.id);
			if(removeAction) {
				growl.success('Journey Removed', {title: 'Success'});
			} else {
				growl.error('There was an issue removing that journey, please try again,', {title: 'Erorr'});
			}
			$location.path('/');
		};

		$scope.cancel = function() {
			$location.path('/');
		};

  	});
