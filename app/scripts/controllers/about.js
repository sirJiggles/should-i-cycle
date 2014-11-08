'use strict';

/**
 * @ngdoc function
 * @name canIcycleApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the canIcycleApp
 */
angular.module('canIcycleApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
