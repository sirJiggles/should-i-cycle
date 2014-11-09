'use strict';

/**
 * @ngdoc overview
 * @name canIcycleApp
 * @description
 * # canIcycleApp
 *
 * Main module of the application.
 */
angular
  .module('canIcycleApp', [
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
