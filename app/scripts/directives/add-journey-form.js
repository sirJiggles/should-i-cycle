'use strict';

/**
 * @ngdoc directive
 * @name shouldICycleApp.addJourneyForm
 * @description
 * # addJourneyForm
 * Directive in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.directive('addJourneyForm', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/add-journey-form.html',
			link: function() {
				// link me!
			}
		};
	});