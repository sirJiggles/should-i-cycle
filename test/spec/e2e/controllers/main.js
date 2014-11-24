'use strict';

describe('Controller: MainCtrl', function() {

	var siteUrl = 'http://localhost:9000';

	it('should display the register form if there is no user data', function(){
		browser.get(siteUrl+'/#/');
		expect(element(by.css('.register')).isDisplayed()).toBe(true);
		expect(element(by.css('.add-journey')).isDisplayed()).toBe(false);
		expect(element(by.css('.journeys')).isDisplayed()).toBe(false);
	});

	it('should not allow the user to register unless both inputs are filled in', function(){
		browser.get(siteUrl+'/#/');
		var nameInput = element(by.model('name')),
			postCodeInput = element(by.model('postCode'));

		nameInput.sendKeys('Gareth');
		expect(element(by.css('.register-button')).isEnabled()).toBe(false);
		nameInput.clear();

		postCodeInput.sendKeys('234 334');
		expect(element(by.css('.register-button')).isEnabled()).toBe(false);
		nameInput.sendKeys('Gareth');
		expect(element(by.css('.register-button')).isEnabled()).toBe(true);
	});

	it('should allow the user to register correctly', function() {
		browser.get(siteUrl+'/#/');
		var nameInput = element(by.model('name'));
		nameInput.sendKeys('e2e User');
		var postCodeInput = element(by.model('postCode'));
		postCodeInput.sendKeys('PE29 2BN');
		element(by.css('.register-button')).click();
		// expect to see the add journey button now we have registered
		expect(element(by.css('.add-journey')).isDisplayed()).toBe(true);
	});

});