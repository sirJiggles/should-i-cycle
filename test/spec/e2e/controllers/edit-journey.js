'use strict';

describe('Controller: EditJourneyCtrl', function() {

	var siteUrl = 'http://localhost:9000';

	it('should redirect the user back if there is no ID flag on the edit-journey route', function(){
		browser.get(siteUrl+'/#/edit-journey');
		browser.waitForAngular();
		expect(browser.getLocationAbsUrl()).toBe('/');
	});

	it('should redirect the user back if there is an incorrect ID on the edit-journey route', function(){
		browser.get(siteUrl+'/#/edit-journey/22');
		browser.waitForAngular();
		expect(browser.getLocationAbsUrl()).toBe('/');
	});

	it('should show the user the edit form with both the name and the time pre-filled in', function() {
		browser.get(siteUrl+'/#/edit-journey/0');
		browser.waitForAngular();
		var timeInput = element(by.model('journeyTime')),
			nameInput = element(by.model('journeyName'));
		expect(nameInput.getText()).toEqual('Commute');
		expect(timeInput.getText()).toEqual('23:20');
	});

	it('should show the edit button and not the add journey button', function() {
		browser.get(siteUrl+'/#/edit-journey/0');
		expect(element(by.css('.add-journey-button')).isDisplayed()).toBe(false);
		expect(element(by.css('.edit-journey-button')).isDisplayed()).toBe(true);
	});

	it('should not allow the user to submit any chnages if there is not both a time and a namepresent', function() {
		browser.get(siteUrl+'/#/edit-journey/0');
		element(by.model('journeyName')).clear();
		expect(element(by.css('.edit-journey-button')).isEnabled()).toBe(false);
		element(by.model('journeyName')).sendKeys('filling in again');
		expect(element(by.css('.edit-journey-button')).isEnabled()).toBe(true);
	});

	it('should allow the user to edit a journey and be re-directed back home', function(){
		browser.get(siteUrl+'/#/edit-journey/0');
		element(by.model('journeyName')).sendKeys('Journey One Rename');
		element(by.model('journeyTime')).sendKeys('10:10');
		element(by.css('.edit-journey-button')).click();
		browser.waitForAngular();
		expect(browser.getLocationAbsUrl()).toBe('/');
	});

	it('should reflect our new chnages in the list of journeys on the screen', function() {
		// @TODO need to get the repeat select working for this bad boi
	});
});