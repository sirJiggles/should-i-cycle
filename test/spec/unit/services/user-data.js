'use strict';

describe('Service: userData', function () {

	// used to fake what comes from the wetaher API so we can test against it (these values are the only ones we care about)
	var dummyWeatherObj = {
		data: {
			weather:[{
				maxtempC: '10',
				mintempC: '3',
				hourly: [
					{
						time: '0',
						tempC: '3',
						weatherDesc: [
							{
								value: 'some weather description'
							}
						],
						windspeedMiles: '3'
					},
					{
						time: '300',
						tempC: '4',
						weatherDesc: [
							{
								value: 'another weather description'
							}
						],
						windspeedMiles: '5'
					},
					{
						time: '600',
						tempC: '5',
						weatherDesc: [
							{
								value: 'and again weather description'
							}
						],
						windspeedMiles: '6'
					}
				]
			}]
		}
	};

    // load the controller's module
    beforeEach(module('shouldICycleApp'));

    // Initialize the controller and set up the dependancies
    beforeEach(inject(function (_userData_) {
        this.userData = _userData_;
        this.userData.clearData();
    }));

    // Testing the API for the user data service
    it('should return null if there is no data set in the local storage', function() {
        var data = this.userData.getData();
        expect(data).toBeNull();
    });

    // UPDATING DETAILS
    it('should be able to update a users settings', function() {
    	// fake a reg user
    	this.userData.registerUser('Gareth Fuller', 'PE29 2BN');
    	var updateOperation = this.userData.updateSettings('New Name', 'New Post');
    	expect(updateOperation).toBe(true);
    	expect(this.userData.getName()).toEqual('New Name');
    	expect(this.userData.getPostCode()).toEqual('New Post');
    });

    it('should return false if the update settings func is not passed two strings', function() {
    	// fake a reg user
		this.userData.registerUser('Gareth Fuller', 'PE29 2BN');
		var updateOperation = false;

		updateOperation = this.userData.updateSettings('Name only');
		expect(updateOperation).toBe(false);
		updateOperation = this.userData.updateSettings();
		expect(updateOperation).toBe(false);
		expect(this.userData.getName()).toEqual('Gareth Fuller');
    	expect(this.userData.getPostCode()).toEqual('PE29 2BN');
    });

    // REGISTERING SECTION
    it('should be able to register a user', function() {
        var data = this.userData.registerUser('Gareth Fuller', 'PE29 2BN');
        expect(data).toBeDefined();
        expect(data.registered).toBe(true);
        expect(data.name).toEqual('Gareth Fuller');
        expect(data.postCode).toEqual('PE29 2BN');
    });

    it('should be able to run the getters and setters for the post code', function() {
        this.userData.setPostCode('TestCode');
        var code = this.userData.getPostCode();
        expect(code).toEqual('TestCode');
    });

    it('should be able to run the getters and setters for the name param', function() {
        this.userData.setName('gareth');
        var name = this.userData.getName();
        expect(name).toEqual('gareth');
    });

    it('should be able to run the getters and setters for the registered flag', function() {
        this.userData.setRegistered();
        var regFlag = this.userData.getRegistered();
        expect(regFlag).toBe(true);
    });

    // ADDING JOURNEYS

    it('should be able to save a journey time to the datastore', function(){
        this.userData.addJourney('07:00', 'Journey One');
        var journey = this.userData.getJourney(0);
        expect(journey.time).toEqual('07:00');
        expect(journey.name).toEqual('Journey One');
    });

    it('should return false if nothing is passed to the add journey func', function() {
        var ret = this.userData.addJourney();
        expect(ret).toBe(false);
    });

    it('should be able to add muliple items to the journeys array', function() {
        this.userData.addJourney('05:10', 'Journey New One');
        this.userData.addJourney('05:20', 'Journey New Two');
        var journeys = this.userData.getJourneys();
        expect(journeys).toBeDefined();
        expect(journeys[0]).toBeDefined();
        expect(journeys[1]).toBeDefined();
        expect(journeys[0].time).toEqual('05:10');
        expect(journeys[0].name).toEqual('Journey New One');
        expect(journeys[1].time).toEqual('05:20');
        expect(journeys[1].name).toEqual('Journey New Two');
    });

    // EDITING JOURNEYS

    it('should be able to edit a journeys time in the datastore', function() {
    	this.userData.addJourney('05:00', 'Test name for the journey');
    	var options = {
    		id: 0,
    		time: '05:10',
    		name: 'Test name for the journey'
    	};
    	this.userData.editJourney(options);
    	var journey = this.userData.getJourney(0);
    	expect(journey.time).toBe('05:10');
    	expect(journey.name).toBe('Test name for the journey');
    });

    it('should be able to edit a journeys name in the datastore', function(){
    	this.userData.addJourney('05:10', 'Test name for the journey');
    	var options = {
    		id: 0,
    		name: 'Rename test',
    		time: '05:10'
    	};
    	this.userData.editJourney(options);
    	var journey = this.userData.getJourney(0);
    	expect(journey.time).toBe('05:10');
    	expect(journey.name).toBe('Rename test');
    });

    it('should be able to edit both name and time for a journey', function() {
    	this.userData.addJourney('05:20', 'Test name for the journey');
    	var options = {
    		id: 0,
    		time: '05:00',
    		name: 'Second Rename'
    	};
    	this.userData.editJourney(options);
    	var journey = this.userData.getJourney(0);
    	expect(journey.time).toBe('05:00');
    	expect(journey.name).toBe('Second Rename');
    });

    it('should return false if it cannot find the journey to edit', function() {
    	this.userData.addJourney('05:00', 'Test name for the journey');
    	var options = {
    		id: 1,
    		name: 'something',
    		time: 'somethingElse'
    	};
    	var journeyEditAction = this.userData.editJourney(options);
    	expect(journeyEditAction).toBe(false);
    });

    it('should return false if there is no name or time in the edit options', function() {
    	this.userData.addJourney('05:00', 'Test name for the journey');
    	var options = {
    		id: 0
    	};
    	var journeyEditAction = this.userData.editJourney(options);
    	expect(journeyEditAction).toBe(false);
    });

    it('should return false if there is no ID in the options obj', function() {
    	this.userData.addJourney('05:00', 'Test name for the journey');
    	var options = {
    		time: '05:10',
    		name: 'something'
    	};
    	var journeyEditAction = this.userData.editJourney(options);
    	expect(journeyEditAction).toBe(false);
    });

    // DELETING JOURNEYS
    it('should be able to remove a journey from the data store', function() {
    	this.userData.addJourney('05:00', 'Test name for the journey');
    	var removeAction = this.userData.removeJourney(0);
    	expect(removeAction).toBe(true);
    });

    it('should return false if no ID is passed to the remove journey function', function() {
    	this.userData.addJourney('05:00', 'Test name for the journey');
    	var removeAction = this.userData.removeJourney();
    	expect(removeAction).toBe(false);
    });

    it('should return false if the user tries to delete a journey that does not exist', function() {
    	this.userData.addJourney('05:00', 'Test name for the journey');
    	var removeAction = this.userData.removeJourney(100);
    	expect(removeAction).toBe(false);
    });

    // INTERACTING WITH WEATHER DATA
    it('should throw an error if you do not pass an object to save the weather', function(){
    	var weatherOperation = this.userData.saveWeather();
    	expect(weatherOperation).toBe(false);
    });

    it('should error if you do not pass a correctly formatted object', function() {
    	var weatherObj = {};
    	var weatherOperation = this.userData.saveWeather(weatherObj);
    	expect(weatherOperation).toBe(false);

    	weatherObj.data = {};
    	weatherObj.data.weather = [{}];
    	weatherOperation = this.userData.saveWeather(weatherObj);
    	expect(weatherOperation).toBe(false);


    	weatherObj.data.weather[0].hourly = [];
    	weatherOperation = this.userData.saveWeather(weatherObj);
    	expect(weatherOperation).toBe(false);

    	weatherObj.data.weather[0].mintempC = '23';
    	weatherOperation = this.userData.saveWeather(weatherObj);
    	expect(weatherOperation).toBe(false);

    	weatherObj.data.weather[0].maxtempC = '34';
    	weatherOperation = this.userData.saveWeather(weatherObj);
    	expect(weatherOperation).toBe(true);
    });

    it('should be able to store todays weather', function(){
    	var weatherOperation = this.userData.saveWeather(dummyWeatherObj),
    		weatherData = this.userData.getWeather();

    	expect(weatherOperation).toBe(true);
    	expect(weatherData).toBeDefined();
    	expect(weatherData.maxtempC).toBeDefined();
    	expect(weatherData.mintempC).toBeDefined();
    	expect(weatherData.hourly).toBeDefined();
    	expect(weatherData.hourly[0]).toBeDefined();
    	expect(weatherData.hourly[2]).toBeDefined();
    });

    // time stamp that saves when we last checked the weather
    it('should save a time when it saves the weather', function(){
    	this.userData.saveWeather(dummyWeatherObj);
    	var timeLastSaved = this.userData.getLastWeatherTime();
    	expect(timeLastSaved).toBeDefined();
    });

    

});
    