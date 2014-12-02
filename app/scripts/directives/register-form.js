'use strict';

/**
 * @ngdoc directive
 * @name shouldICycleApp.registerForm
 * @description
 * # registerForm
 * Directive in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.directive('registerForm', function (userData, growl, $location) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/register-form.html',
			link: function(scope) {
				scope.registerUser = function() {
			    	scope.data = userData.registerUser(scope.name, scope.postCode);

			    	if(!scope.data) {
			    		growl.error('Unable to register, please try again.', {title:'Error'});
			    	}
	    		};
	    		scope.updateSettings = function() {
	    			var updateOperation = userData.updateSettings(scope.name, scope.postCode);
	    			if(updateOperation) {
		    			growl.success('Settings updated', {title:'Success'});
	    			} else {
	    				growl.error('Unable to update settings, please try again.', {title:'Error'});
	    			}
	    			$location.path('/');
	    		};
			}
		};
	});