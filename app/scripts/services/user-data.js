'use strict';

/**
 * @ngdoc service
 * @name shouldICycleApp.userData
 * @description
 * # userData
 * Service in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.service('userData', function () {
		
		// get the data for the API
		var ref = 'should-i-cycle',
			userData = JSON.parse(window.localStorage.getItem(ref));

		this.registerUser = function(name, postCode) {
			// validate the inputs
			if(typeof name === 'undefined' || typeof postCode === 'undefined') {
				return null;
			}
			this.setRegistered();
			this.setPostCode(postCode);
			this.setName(name);
			this.save();
			return userData;
		};

		this.save = function() {
			window.localStorage.setItem(ref, JSON.stringify(userData));
		};

		this.setRegistered = function() {
			userData = userData || {};
			userData.registered = true;
		};

		this.getRegistered =  function() {
			return userData.registered;
		};

		this.setPostCode = function(postCode) {
			userData = userData || {};
			userData.postCode = postCode;
		};

		this.getPostCode = function() {
			return userData.postCode;
		};

		this.setName = function(name) {
			userData = userData || {};
			userData.name = name;
		};

		this.getName = function() {
			return userData.name;
		};

		this.addJourney = function(time, name) {
			if (typeof time === 'undefined' || typeof name === 'undefined') {
				return false;
			}
			// define if not defined
			userData = userData || {};
			userData.journeys = userData.journeys || [];

			userData.journeys.push({time:time, name:name});
			this.save();
			
			return true;
		};

		this.getJourney = function(index) {
			return (userData.journeys[index]) ? userData.journeys[index] : false;
		};

		this.getJourneys = function() {
			return (userData.journeys) ? userData.journeys : false;
		};

		this.getData = function(){
			return userData;
		};

		this.clearData = function() {
			window.localStorage.setItem(ref, null);
			userData = null;
		};


  	});
