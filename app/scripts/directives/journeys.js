'use strict';

/**
 * @ngdoc directive
 * @name shouldICycleApp.journeys
 * @description
 * # journeys
 * Directive in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.directive('journeys', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/journeys.html',
			link: function() {
			}
		};
	});