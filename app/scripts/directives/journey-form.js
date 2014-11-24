'use strict';

/**
 * @ngdoc directive
 * @name shouldICycleApp.journeyForm
 * @description
 * # journeyForm
 * Directive in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.directive('journeyForm', function ($location, $routeParams, userData, growl) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/journey-form.html',
			link: function(scope) {

				// set scope values for the form if we have an id
				if ($routeParams.id) {
					var journey = userData.getJourney($routeParams.id);

					// if we have a journey update the bindings else redirect them home with a msg
					if (journey) {
						scope.journeyName = journey.name;
						scope.journeyTime = new Date(journey.time);
					}else {
						$location.path('/');
						growl.warning('Could not find a journey with that ID', {title: 'Warning'});
					}
				}

				// add journey functionality
				scope.addJourney = function() {
					// add the journey and redirect home
					var formSubmission = userData.addJourney(scope.journeyTime, scope.journeyName);

					// make sure we have a correct journey, then set msg and redirect
					if (formSubmission) {
						$location.path('/');
						growl.success('Journey added', {title: 'Success'});
					} else {
						growl.error('Unable to add journey! Please try again', {title: 'Error'});
					}
				};

				// edit journey functionality
				scope.editJourney = function() {
					var options = {
						id: $routeParams.id,
						time: scope.journeyTime,
						name: scope.journeyName
					};
					var formSubmission = userData.editJourney(options);
					if(formSubmission) {
						$location.path('/');
						growl.success('Journey updated', {title: 'Success'});
					} else {
						growl.error('Unable to edit journey! Please try again', {title: 'Error'});
					}
				};
			}
		};
	});