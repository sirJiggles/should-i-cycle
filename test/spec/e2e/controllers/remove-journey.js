'use strict';

describe('Controller: DeleteJourneyCtrl', function() {

	var siteUrl = 'http://localhost:9000';

	it('should redirect the user back if there is an incorrect ID on the delete-journey route', function(){
		browser.get(siteUrl+'/#/remove-journey/22');
		browser.waitForAngular();
		expect(browser.getLocationAbsUrl()).toBe('/');
	});

	it('should show the user the journey name they are about to remove, and the buttons for canceling  / proceeding', function(){
		browser.get(siteUrl+'/#/remove-journey/0');
		expect(element(by.css('.cancel-button')).isDisplayed()).toBe(true);
		expect(element(by.css('.confirm-button')).isDisplayed()).toBe(true);
		var journeyName = element(by.binding('item'));
		expect(journeyName.getText()).toEqual('Are you sure you wish to remove Journey One Rename?');
	});

	it('should redirect back home if the user cancels', function(){
		browser.get(siteUrl+'/#/add-journey');
		element(by.css('.cancel-button')).click();
		expect(browser.getLocationAbsUrl()).toEqual('/');
	});

	it('should delete the journey if the user clicks the confirm button', function(){
		browser.get(siteUrl+'/#/remove-journey/0');
		element(by.css('.confirm-button')).click();
		expect(browser.getLocationAbsUrl()).toEqual('/');
	});

	it('should now only have one journey on the homepage list', function(){
		browser.get(siteUrl+'/#/');
		expect(element.all(by.repeater('journey in data.journeys')).count()).toEqual(1);
	});

});