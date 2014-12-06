'use strict';

/**
 * @ngdoc directive
 * @name shouldICycleApp.settingsButton
 * @description
 * # settingsButton
 * Directive in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.directive('settingsButton', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/settings-button.html',
			link: function() {
			}
		};
	});