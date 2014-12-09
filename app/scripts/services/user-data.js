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
				return false;
			}
			if(name === '' || postCode === ''){
				return false;
			}
			this.setRegistered();
			this.setPostCode(postCode);
			this.setName(name);
			this.save();
			return userData;
		};

		// update settings function
		this.updateSettings = function(name, postCode) {
			// validate the inputs
			if(typeof name === 'undefined' || typeof postCode === 'undefined') {
				return false;
			}
			if(name === '' || postCode === '') {
				return false;
			}

			this.setPostCode(postCode);
			this.setName(name);
			this.setUpdatedSettings(true);
			this.save();
			return true;
		};

		this.save = function() {
			window.localStorage.setItem(ref, JSON.stringify(userData));
		};

		this.setRegistered = function() {
			userData = userData || {};
			userData.registered = true;
		};

		this.getRegistered =  function() {
			userData = userData || {};
			return (userData.registered) ? userData.registered : false;
		};

		this.setUpdatedSettings = function(value) {
			userData = userData || {};
			if(typeof value === 'undefined') {
				value = true;
			}
			userData.settingsUpdated = value;
		};

		this.getUpdatedSettings = function(){
			userData = userData || {};
			return (userData.settingsUpdated) ? userData.settingsUpdated : false;
		};

		this.setPostCode = function(postCode) {
			userData = userData || {};
			userData.postCode = postCode;
		};

		this.getPostCode = function() {
			userData = userData || {};
			return (userData.postCode) ? userData.postCode : false;
		};

		this.setName = function(name) {
			userData = userData || {};
			userData.name = name;
		};

		this.getName = function() {
			userData = userData || {};
			return (userData.name) ? userData.name : false;
		};

		// add journey function takes only two args the time and name and sets them accordingly in the data store
		this.addJourney = function(time, name) {
			if (typeof time === 'undefined' || typeof name === 'undefined') {
				return false;
			}

			if (time === '' || name === '') {
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
			if (typeof options.name === 'undefined' || typeof options.time === 'undefined') {
				return false;
			}
			if (options.time === '' || options.name === '') {
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
			userData = userData || {};
			return (userData.journeys[index]) ? userData.journeys[index] : false;
		};

		this.getJourneys = function() {
			userData = userData || {};
			return (userData.journeys) ? userData.journeys : false;
		};

		this.getData = function(){
			userData = userData || {};
			return userData;
		};

		this.clearData = function() {
			window.localStorage.setItem(ref, null);
			userData = null;
		};

		this.saveWeather = function(weatherData) {
			// sanity check the data to make sure we have the min we expect to get
			if(typeof weatherData === 'undefined' || weatherData === '') {
				return false;
			}
			if( typeof weatherData.data === 'undefined' ||
				typeof weatherData.data.weather === 'undefined' ||
				typeof weatherData.data.weather[0] === 'undefined' ||
				typeof weatherData.data.weather[1] === 'undefined') {
				return false;
			}
			userData = userData || {};
			userData.weather = weatherData.data.weather;
			this.setLastWeatherTime(new Date().getTime());
			this.save();
			return true;
		};

		this.getWeather = function() {
			userData = userData || {};
			return (userData.weather) ? userData.weather : false;
		};

		this.setLastWeatherTime = function(time) {
			userData.lastWeatherTime = time;
		};

		this.getLastWeatherTime = function() {
			userData = userData || {};
			return (userData.lastWeatherTime) ? userData.lastWeatherTime : false;
		};


  	});
