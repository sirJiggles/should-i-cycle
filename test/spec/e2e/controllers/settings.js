'use strict';

describe('Controller: SettingsCtrl', function() {

	var siteUrl = 'http://localhost:9000';

	it('should navigate to the settings form when the settings link is clicked', function(){
		browser.get(siteUrl+'/#/');
		element(by.css('.settings-btn')).click();
		expect(browser.getLocationAbsUrl()).toBe('/settings');
	});


	it('should not allow the user to update settings unless both inputs are filled in', function(){
		browser.get(siteUrl+'/#/settings');
		var nameInput = element(by.model('name')),
			postCodeInput = element(by.model('postCode'));

		postCodeInput.clear();
		expect(element(by.css('.update-button')).isEnabled()).toBe(false);
		nameInput.clear();
		postCodeInput.sendKeys('234 334');
		expect(element(by.css('.update-button')).isEnabled()).toBe(false);
		nameInput.sendKeys('Gareth');
		expect(element(by.css('.update-button')).isEnabled()).toBe(true);
	});

	it('should not show the register button', function(){
		browser.get(siteUrl+'/#/settings');
		expect(element(by.css('.register-button')).isDisplayed()).toBe(false);
	});

	it('should allow the user to update settings correctly', function() {
		browser.get(siteUrl+'/#/settings');
		var nameInput = element(by.model('name'));
		nameInput.sendKeys('e2e User');
		var postCodeInput = element(by.model('postCode'));
		postCodeInput.sendKeys('PE29 2BN');
		element(by.css('.update-button')).click();
		// expect to be re-directed out
		expect(browser.getLocationAbsUrl()).toBe('/');
		
	});

	it('should show the cancel button on the settings form', function(){
		browser.get(siteUrl+'/#/settings');
		expect(element(by.css('.cancel-button')).isDisplayed()).toBe(true);
	});

	it('should allow the user to cancel updating the settings', function(){
		browser.get(siteUrl+'/#/settings');
		element(by.css('.cancel-button')).click();
		expect(browser.getLocationAbsUrl()).toBe('/');
	});

});