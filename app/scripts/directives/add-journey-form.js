'use strict';

/**
 * @ngdoc directive
 * @name shouldICycleApp.addJourneyForm
 * @description
 * # addJourneyForm
 * Directive in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.directive('addJourneyForm', function ($location, userData, growl) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/add-journey-form.html',
			link: function(scope) {

				scope.addJourney = function() {
					// add the journey and redirect home
					var formSubmission = userData.addJourney(scope.journeyTime, scope.journeyName);

					// make sure we have a correct journey, then set msg and redirect
					if (formSubmission) {
						$location.path('/');
						growl.success('Journey added', {title: 'Success'});
					}else {
						growl.error('Unable to add journey! Please try again', {title: 'Error'});
					}
				};
			}
		};
	});