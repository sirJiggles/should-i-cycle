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

		// register user func, call internal API setters to set the users details and the registered flag
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

		// add journey function takes only two args the time and name and sets them accordingly in the data store
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

		// edit journey function checks to make  sure we have the right data to work with, can find the journey
		// then saves it back to the store
		this.editJourney = function(options) {
			if (typeof options.name === 'undefined' && typeof options.time === 'undefined') {
				return false;
			}
			if(typeof options.id === 'undefined') {
				return false;
			}
			var journey = this.getJourney(options.id);
			if(!journey) {
				return false;
			}
			// update the record
			userData.journeys[options.id] = {
				time: (options.time) ? options.time : userData.journeys[options.id].time, 
				name: (options.name) ? options.name : userData.journeys[options.id].name
			};
			this.save();
			return true;
		};

		// remove the journeys
		this.removeJourney = function(index) {
			// check for args
			if (typeof index === 'undefined') {
				return false;
			}
			// check for item
			var journey = userData.journeys[index];
			if(!journey) {
				return false;
			}
			// remove item
			userData.journeys.splice(index, 1);
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
