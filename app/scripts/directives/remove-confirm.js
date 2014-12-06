'use strict';

/**
 * @ngdoc directive
 * @name shouldICycleApp.removeConfirm
 * @description
 * # removeConfirm
 * Directive in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.directive('removeConfirm', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/remove-confirm.html',
			link: function() {

			}
		};
	});