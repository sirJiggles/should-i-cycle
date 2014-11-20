'use strict';

/**
 * @ngdoc directive
 * @name shouldICycleApp.addFirstJourney
 * @description
 * # addFirstJourney
 * Directive in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.directive('addFirstJourney', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/add-first-journey.html',
			link: function() {
				// link me!
			}
		};
	});