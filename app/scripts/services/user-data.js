'use strict';

/**
 * @ngdoc service
 * @name shouldICycleApp.userData
 * @description
 * # userData
 * Service in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.factory('userData', function () {
		
		// get the data for the API
		var ref = 'should-i-cycle',
			userData = JSON.parse(window.localStorage.getItem(ref));

		return {

			registerUser: function(name, postCode) {
				// validate the inputs
				if(typeof name === 'undefined' || typeof postCode === 'undefined') {
					return null;
				}
				this.setRegistered();
				this.setPostCode(postCode);
				this.setName(name);
				this.save();
				return userData;
			},

			save: function() {
				window.localStorage.setItem(ref, JSON.stringify(userData));
			},

			setRegistered: function() {
				userData = userData || {};
				userData.registered = true;
			},

			getRegistered: function() {
				return userData.registered;
			},

			setPostCode: function(postCode) {
				userData = userData || {};
				userData.postCode = postCode;
			},

			getPostCode: function() {
				return userData.postCode;
			},

			setName: function(name) {
				userData = userData || {};
				userData.name = name;
			},

			getName: function() {
				return userData.name;
			},

			addJourney: function(time) {
				if (typeof time === 'undefined') {
					return false;
				}
				// define if not defined
				userData = userData || {};
				userData.journeys = userData.journeys || [];

				userData.journeys.push(time);
				this.save();
			},

			getJourney: function(index) {
				return (userData.journeys[index]) ? userData.journeys[index] : false;
			},

			getJourneys: function() {
				return (userData.journeys) ? userData.journeys : false;
			},

			getData: function(){
				return userData;
			},

			clearData: function() {
				window.localStorage.setItem(ref, null);
				userData = null;
			}
		};

  	});
