'use strict';

/**
 * @ngdoc overview
 * @name shouldICycleApp
 * @description
 * # shouldICycleApp
 *
 * Main module of the application.
 */

// controllers module


// services module


// directives module

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
			.when('/remove-journey/:id', {
				templateUrl: 'views/remove-confirm.html',
				controller: 'RemoveJourneyCtrl'
			})
			.when('/settings', {
				templateUrl: 'views/settings.html',
				controller: 'SettingsCtrl'
			})
			.otherwise({
				redirectTo: '/404.html'
			});

      	growlProvider.globalTimeToLive(3000);
  		growlProvider.globalPosition('bottom-center growl-fixed');
  	})
  	.run(function ($rootScope){
  		$rootScope.$on('$routeChangeSuccess',function(){
  			// stop the flicker when scrolled part way down the screem and chnage view
		    window.scrollTo(55,0);
		});
  	});
