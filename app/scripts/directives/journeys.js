'use strict';

/**
 * @ngdoc directive
 * @name shouldICycleApp.journeys
 * @description
 * # journeys
 * Directive in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.directive('journeys', function ($location) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/journeys.html',
			link: function(scope) {
				// as we are clicking icons and not links
				scope.naviateTo = function(path) {
					$location.path(path);
				}
			}
		};
	});