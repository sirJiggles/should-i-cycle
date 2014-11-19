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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
