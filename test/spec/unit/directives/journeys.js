// Most of the weather logic is done in the journeys directive
'use strict';

describe('Directive: Journeys', function () {

    // load the app module
    beforeEach(module('shouldICycleApp'));

    // mock the weather data
    var userData,
    	scope,
    	dummyWeatherObj = {
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
							windspeedMiles: '3',
							winddir16Point: 'NE',
							chanceofrain: '10'
						},
						{
							time: '300',
							tempC: '4',
							weatherDesc: [
								{
									value: 'another weather description'
								}
							],
							windspeedMiles: '5',
							winddir16Point: 'N',
							chanceofrain: '12'
						},
						{
							time: '600',
							tempC: '5',
							weatherDesc: [
								{
									value: 'and again weather description'
								}
							],
							windspeedMiles: '6',
							winddir16Point: 'NW',
							chanceofrain: '14'
						},
						{
							time: '900',
							tempC: '5',
							weatherDesc: [
								{
									value: 'and again weather description'
								}
							],
							windspeedMiles: '7',
							winddir16Point: 'NNW',
							chanceofrain: '20'
						},
						{
							time: '1200',
							tempC: '4',
							weatherDesc: [
								{
									value: 'and again weather description'
								}
							],
							windspeedMiles: '8',
							winddir16Point: 'NE',
							chanceofrain: '30'
						},
						{
							time: '1500',
							tempC: '4',
							weatherDesc: [
								{
									value: 'and again weather description'
								}
							],
							windspeedMiles: '9',
							winddir16Point: 'NE',
							chanceofrain: '50'
						},
						{
							time: '1800',
							tempC: '3',
							weatherDesc: [
								{
									value: 'and again weather description'
								}
							],
							windspeedMiles: '10',
							winddir16Point: 'N',
							chanceofrain: '89'
						},
						{
							time: '2100',
							tempC: '2',
							weatherDesc: [
								{
									value: 'and again weather description'
								}
							],
							windspeedMiles: '11',
							winddir16Point: 'NNE',
							chanceofrain: '98'
						}
					]
				},
				{
					maxtempC: '15',
					mintempC: '2',
					hourly: [
						{
							time: '0',
							tempC: '3',
							weatherDesc: [
								{
									value: 'some weather description TWO'
								}
							],
							windspeedMiles: '3',
							winddir16Point: 'SE',
							chanceofrain: '0'
						},
						{
							time: '300',
							tempC: '4',
							weatherDesc: [
								{
									value: 'another weather description TWO'
								}
							],
							windspeedMiles: '5',
							winddir16Point: 'S',
							chanceofrain: '0'
						},
						{
							time: '600',
							tempC: '5',
							weatherDesc: [
								{
									value: 'and again weather description TWO'
								}
							],
							windspeedMiles: '6',
							winddir16Point: 'SW',
							chanceofrain: '0'
						},
						{
							time: '900',
							tempC: '5',
							weatherDesc: [
								{
									value: 'and again weather description TWO'
								}
							],
							windspeedMiles: '7',
							winddir16Point: 'SSW',
							chanceofrain: '0'
						},
						{
							time: '1200',
							tempC: '4',
							weatherDesc: [
								{
									value: 'and again weather description TWO'
								}
							],
							windspeedMiles: '8',
							winddir16Point: 'SE',
							chanceofrain: '0'
						},
						{
							time: '1500',
							tempC: '4',
							weatherDesc: [
								{
									value: 'and again weather description TWO'
								}
							],
							windspeedMiles: '9',
							winddir16Point: 'SE',
							chanceofrain: '0'
						},
						{
							time: '1800',
							tempC: '3',
							weatherDesc: [
								{
									value: 'and again weather description TWO'
								}
							],
							windspeedMiles: '10',
							winddir16Point: 'S',
							chanceofrain: '0'
						},
						{
							time: '2100',
							tempC: '2',
							weatherDesc: [
								{
									value: 'and again weather description TWO'
								}
							],
							windspeedMiles: '11',
							winddir16Point: 'SSE',
							chanceofrain: '0'
						}
					]
				}]
			}
		};

	// we dont need the directive template to be loaded as the tests are for functionality that we will have to mock
	// for this then we will mock the main controller as we do need the userData service
	beforeEach(inject(function ($controller, $rootScope, _userData_) {
        scope = $rootScope.$new();
        userData = _userData_;

        // resister a test user before each test, we test the register functionality in that directive so no need for it here.
        userData.registerUser('Gareth', 'PE29');

        // inject the dummy weather into the service
        userData.saveWeather(dummyWeatherObj);

        $controller('MainCtrl', {
            $scope: scope,
            userData: _userData_
        });

    }));

    afterEach(function() {
    	userData.clearData();
	});
    
    it('should not do anything if there are no journeys', function(){
		var data = userData.getData(),
			test = (data.journeys) ? true : false;

		expect(test).toBe(false);
    });

    it('should not do anything if there are no journeys or weaher data', function(){
    	var data = userData.getData();
    	data.weather = false;
    	var test = (data.journeys && data.weather) ? true : false;
    	expect(test).toBe(false);
    });

    it('should loop through all the journeys and create a formatted new weather object', function(){
    	//add some fake journeys first
    	var timeOne = new Date().getTime() - 10800000, // minus three hours
    		timeTwo = new Date().getTime() + 10800000; // plus three hours

    	userData.addJourney(timeOne, 'Journey One');
    	userData.addJourney(timeTwo, 'Journey Two');

    	var data = userData.getData(),
    		weather = [];

    	if (data.weather && data.journeys) {
    		if(data.journeys.length > 0) {

    			// our tmp container
  				var dayIndex = 0,
  					currentTime = new Date().getHours();

  				for (var i = 0; i < data.journeys.length; i++) {

  					weather[i] = {};

  					// first we will work out which section of the weather hours array we need
  					var journeyTime = new Date(data.journeys[i].time).getHours(),
  						hourSeg = 0,
  						diff = currentTime - journeyTime;

					// check journey time has already passed by 1 hour (avrg journey time)
					dayIndex = (diff >= 1) ? 1 : 0;

					// so we can display what day the weather is for
					weather[i].day = (dayIndex === 0) ? 'Today' : 'Tomorrow';

					if(journeyTime <= 2) {
						hourSeg = 0;
					} else if(journeyTime > 3 && journeyTime <= 5) {
						hourSeg = 1;
					} else if(journeyTime > 5 && journeyTime <= 8) {
						hourSeg = 2;
					} else if(journeyTime > 8 && journeyTime <= 11) {
						hourSeg = 3;
					} else if(journeyTime > 11 && journeyTime <= 14) {
						hourSeg = 4;
					} else if(journeyTime > 14 && journeyTime <= 17) {
						hourSeg = 5;
					} else if(journeyTime > 17 && journeyTime <= 20) {
						hourSeg = 6;
					} else if(journeyTime > 20 && journeyTime <= 23) {
						hourSeg = 7;
					}

					// now we can set some values
					weather[i].chanceofrain = data.weather[dayIndex].hourly[hourSeg].chanceofrain;
					weather[i].tempC = data.weather[dayIndex].hourly[hourSeg].tempC;
					weather[i].windspeedMiles = data.weather[dayIndex].hourly[hourSeg].windspeedMiles;
					weather[i].winddir16Point = data.weather[dayIndex].hourly[hourSeg].winddir16Point;
					weather[i].descr = data.weather[dayIndex].hourly[hourSeg].weatherDesc[0].value;
				}


    		} // end if journeys length check 
    	} // end if wather and journeys

    	expect(weather).toBeDefined();
    	expect(weather[0]).toBeDefined();
    	expect(weather[1]).toBeDefined();
    	// should not have weather for a third journey
    	expect(weather[2]).not.toBeDefined();

    	// check all the props
    	expect(weather[0].chanceofrain).toBeDefined();
    	expect(weather[0].tempC).toBeDefined();
    	expect(weather[0].windspeedMiles).toBeDefined();
    	expect(weather[0].winddir16Point).toBeDefined();
    	expect(weather[0].descr).toBeDefined();

    	// now we know that time two is in the future so it should be using the current day from the weather data and as
    	// time one is in the past by three hours we will use tomorrows data
    	expect(weather[0].day).toEqual('Tomorrow');
    	expect(weather[1].day).toEqual('Today');

    	// as we do not know the time that the test is run we cannot check agains the actual values but if they are set
    	// all should be good

    });

	it('should set a color prop on the weather if it is going to be good bad or ok', function(){
		
		var weather = [{
				chanceofrain: 20,
				tempC: 4,
				windspeedMiles: 10
			},
			{
				chanceofrain: 10,
				tempC: 5,
				windspeedMiles: 5
			},
			{
				chanceofrain: 30,
				tempC: 0,
				windspeedMiles: 20
			},
			{
				chanceofrain: 2,
				tempC: 1,
				windspeedMiles: 4
			},
			{
				chanceofrain: 80,
				tempC: 20,
				windspeedMiles: 4
			},
			{
				chanceofrain: 3,
				tempC: 15,
				windspeedMiles: 4
			}];

		// this is the code that will go into the directive
		var testWeather = function(data) {
			var type = '';

			if (data.chanceofrain > 20 || data.tempC < 0 || data.windspeedMiles > 20) {
				type = 'bad';
			} else if ( (data.chanceofrain < 21 && data.chanceofrain > 12) || 
						(data.tempC > 0 && data.tempC < 10) || 
						(data.windspeedMiles < 21 && data.windspeedMiles > 10) ){
				type = 'ok';
			} else {
				type = 'good';
			}

			return type;
		};

		var testOne = testWeather(weather[0]),
			testTwo = testWeather(weather[1]),
			testThree = testWeather(weather[2]),
			testFour = testWeather(weather[3]),
			testFive = testWeather(weather[4]),
			testSix = testWeather(weather[5]);

		expect(testOne).toEqual('ok');
		expect(testTwo).toEqual('ok');
		expect(testThree).toEqual('bad');
		expect(testFour).toEqual('ok');
		expect(testFive).toEqual('bad');
		expect(testSix).toEqual('good');

	});

});