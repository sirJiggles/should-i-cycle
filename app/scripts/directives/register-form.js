'use strict';

/**
 * @ngdoc directive
 * @name shouldICycleApp.registerForm
 * @description
 * # registerForm
 * Directive in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.directive('registerForm', function (userData) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/register-form.html',
			link: function(scope) {
				scope.registerUser = function() {
			    	scope.data = userData.registerUser(scope.name, scope.postCode);
	    		};
			}
		};
	});