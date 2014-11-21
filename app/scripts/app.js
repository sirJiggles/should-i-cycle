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
    'angular-growl'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/add-journey', {
        templateUrl: 'views/add-journey.html',
        controller: 'AddJourneyCtrl'
      })
      .otherwise({
        redirectTo: '/404.html'
      });
  });
