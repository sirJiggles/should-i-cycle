'use strict';

describe('Controller: AddJourneyCtrl', function() {

	var siteUrl = 'http://localhost:9000';

	it('Should display the add journey button on the main screen', function() {
		browser.get(siteUrl+'/#/');
		expect(element(by.css('.register')).isDisplayed()).toBe(false);
		expect(element(by.css('.add-journey')).isDisplayed()).toBe(true);
	});

	it('should contain two inputs and a submission button for the add journey form', function(){
		browser.get(siteUrl+'/#/add-journey');
		expect(element(by.model('journeyName')).isDisplayed()).toBe(true);
		expect(element(by.model('journeyTime')).isDisplayed()).toBe(true);
		expect(element(by.css('.add-journey-button')).isDisplayed()).toBe(true);
	});

	it('should not allow submission if both time and name are not filled in', function(){
		browser.get(siteUrl+'/#/add-journey');
		var timeInput = element(by.model('journeyTime')),
			nameInput = element(by.model('journeyName'));

		expect(element(by.css('.add-journey-button')).isEnabled()).toBe(false);
		nameInput.sendKeys('Commute to work');
		expect(element(by.css('.add-journey-button')).isEnabled()).toBe(false);
		nameInput.clear();
		timeInput.sendKeys('12:30');
		expect(element(by.css('.add-journey-button')).isEnabled()).toBe(false);
		nameInput.sendKeys('Journey One');
		expect(element(by.css('.add-journey-button')).isEnabled()).toBe(true);
	});

	it('should allow the user to create a journey', function(){
		browser.get(siteUrl+'/#/add-journey');
		element(by.model('journeyName')).sendKeys('Commute');
		element(by.model('journeyTime')).sendKeys('23:20');
		element(by.css('.add-journey-button')).click();
		expect(browser.getLocationAbsUrl()).toEqual('/');
	});

	it('should display the journeys on the main screen', function() {
		browser.get(siteUrl+'/#/');
		expect(element(by.css('.register')).isDisplayed()).toBe(false);
		expect(element(by.css('.add-journey')).isDisplayed()).toBe(true);
		expect(element(by.css('.journeys')).isDisplayed()).toBe(true);
	});

	it('should have our journey up on the list', function(){
		browser.get(siteUrl+'/#/');
		browser.waitForAngular();
		expect(element.all(by.repeater('journey in data.journeys')).count()).toEqual(1);
	});

	it('should allow us to create a second journey', function(){
		browser.get(siteUrl+'/#/add-journey');
		element(by.model('journeyName')).sendKeys('Commute 2');
		element(by.model('journeyTime')).sendKeys('10:20'); 
		element(by.css('.add-journey-button')).click();
	});

	it('should show both journeys on the home screen', function(){
		browser.get(siteUrl+'/#/');
		browser.waitForAngular();
		expect(element.all(by.repeater('journey in data.journeys')).count()).toEqual(2);
	});


});