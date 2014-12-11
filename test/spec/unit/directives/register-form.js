'use strict';

describe('Directive: RegisterForm', function () {

    // load the app module
    beforeEach(module('shouldICycleApp'));

    // load the directive template
    beforeEach(module('views/directives/register-form.html'));

    var userData,
    	growl,
    	scope,
    	$location,
    	element;

    // Initialize the directive and set up the dependancies
    beforeEach(inject(function ($rootScope, $compile, _userData_, _growl_, _$location_) {
        scope = $rootScope.$new();
        userData = _userData_;
        growl = _growl_;
        $location = _$location_;

        element = angular.element('<register-form></register-form>');
        $compile(element)(scope);
        scope.$digest();

        spyOn($location, 'path');
        spyOn(growl, 'success').and.returnValue(1);
    	spyOn(growl, 'error').and.returnValue(2);
    	spyOn(growl, 'warning').and.returnValue(3);
    }));

    afterEach(function() {
    	userData.clearData();
	});

    it('should error if trying to reg a user without a name', function() {
    	scope.register = true;
    	scope.name = '';
    	scope.postCode = 'Something';
    	spyOn(scope, 'registerUser').and.callThrough();
    	scope.registerUser();
    	expect(scope.registerUser).toHaveBeenCalled();
    	expect(growl.error).toHaveBeenCalledWith('Unable to register, please try again.', {title:'Error'});
    });

    it('should error if trying to reg a user without a post code', function() {
    	scope.register = true;
    	scope.name = 'Someting';
    	scope.postCode = '';
    	spyOn(scope, 'registerUser').and.callThrough();
    	scope.registerUser();
    	expect(scope.registerUser).toHaveBeenCalled();
    	expect(growl.error).toHaveBeenCalledWith('Unable to register, please try again.', {title:'Error'});
    });

    it('should be able to reg a user using the scope.register function', function() {

    	scope.register = true;
    	scope.name = 'Gareth Fuller';
    	scope.postCode = 'PE29 2BN';

    	spyOn(scope, 'registerUser').and.callThrough();
    	scope.registerUser();

    	expect(scope.registerUser).toHaveBeenCalled();

    	// check on the data we got back from running the function
        var data = scope.data;
        expect(data.registered).toBeDefined();
        expect(data.registered).toBeTruthy();
        expect(data.postCode).toBeDefined();
        expect(data.postCode).toEqual('PE29 2BN');
        expect(data.name).toBeDefined();
        expect(data.name).toEqual('Gareth Fuller');
    });

    it('should throw an error if the user tries to register without a name', function(){
    	scope.settings = true;

    	// set up some existing details
    	userData.registerUser('TestUser', 'OldPost');
    	// spy on our function
    	spyOn(scope, 'updateSettings').and.callThrough();
    	scope.postCode = userData.getPostCode();
    	scope.name = '';

    	scope.updateSettings();

    	expect(growl.error).toHaveBeenCalledWith('Unable to update settings, please try again.', {title:'Error'});
    	expect($location.path).toHaveBeenCalledWith('/');
    });

    it('should throw an error if the user tries to register without a postCode', function(){
    	scope.settings = true;

    	// set up some existing details
    	userData.registerUser('TestUser', 'OldPost');
    	// spy on our function
    	spyOn(scope, 'updateSettings').and.callThrough();
    	scope.postCode = '';
    	scope.name = userData.getName();

    	scope.updateSettings();

    	expect(growl.error).toHaveBeenCalledWith('Unable to update settings, please try again.', {title:'Error'});
    	expect($location.path).toHaveBeenCalledWith('/');
    });

    it('should be able to change the settings for the user', function() {

    	scope.settings = true;

    	// set up some existing details
    	userData.registerUser('TestUser', 'OldPost');
    	// spy on our function
    	spyOn(scope, 'updateSettings').and.callThrough();

    	scope.name = userData.getName();
    	scope.postCode = userData.getPostCode();

    	// double check details in data store
    	expect(scope.name).toEqual('TestUser');
    	expect(scope.postCode).toEqual('OldPost');

    	// ACT
    	scope.name = 'Gareth';
    	scope.postCode = 'NewPost';
    	scope.updateSettings();

    	// Assert
    	expect(scope.updateSettings).toHaveBeenCalled();
    	expect(growl.success).toHaveBeenCalledWith('Settings updated', {title:'Success'});
		expect(userData.getName()).toEqual('Gareth');
    	expect(userData.getPostCode()).toEqual('NewPost');
    	expect($location.path).toHaveBeenCalledWith('/');
    });

    it('should allow the user to cancel editing the settings', function(){
    	scope.settings = true;
    	// set up some existing details
    	userData.registerUser('TestUser', 'OldPost');
    	scope.name = userData.getName();
    	scope.postCode = userData.getPostCode();
    	// spy on our function
    	spyOn(scope, 'cancel').and.callThrough();

    	scope.cancel();

    	expect(scope.cancel).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/');
    });


});
    