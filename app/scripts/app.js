'use strict';

/**
 * @ngdoc overview
 * @name shouldICycleApp
 * @description
 * # shouldICycleApp
 *
 * Main module of the application.
 */
angular
	.module('shouldICycleApp', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'angular-growl',
		'ui.bootstrap'
	])
	.config(function ($routeProvider, growlProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/add-journey', {
				templateUrl: 'views/journey.html',
				controller: 'AddJourneyCtrl'
			})
			.when('/edit-journey/:id', {
				templateUrl: 'views/journey.html',
				controller: 'EditJourneyCtrl'
			})
			.otherwise({
				redirectTo: '/404.html'
			});

      	growlProvider.globalTimeToLive(3000);
  		growlProvider.globalPosition('bottom-center growl-fixed');
  	});
