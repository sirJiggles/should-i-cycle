'use strict';

/**
 * @ngdoc directive
 * @name shouldICycleApp.journeys
 * @description
 * # journeys
 * Directive in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.directive('journeys', function (userData) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/journeys.html',
			link: function(scope) {
				// using the user data API get the journeys for the scope to loop through
				scope.journeys = userData.getJourneys();
			}
		};
	});