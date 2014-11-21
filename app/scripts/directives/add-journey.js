'use strict';

/**
 * @ngdoc directive
 * @name shouldICycleApp.addJourney
 * @description
 * # addJourney
 * Directive in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.directive('addJourney', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/add-journey.html',
			link: function() {
				// link me!
			}
		};
	});