'use strict';

describe('Directive: RegisterForm', function () {

    // load the app module
    beforeEach(module('shouldICycleApp'));

    // load the directive template
    beforeEach(module('views/directives/register-form.html'));

    var userData,
    	growl,
    	scope,
    	element;

    // Initialize the directive and set up the dependancies
    beforeEach(inject(function ($rootScope, $compile, _userData_, _growl_) {
        scope = $rootScope;
        userData = _userData_;
        growl = _growl_;
        element = angular.element('<register-form></register-form>');
        $compile(element)($rootScope);
        scope.$digest();

        spyOn(growl, 'success').and.returnValue(1);
    	spyOn(growl, 'error').and.returnValue(2);
    	spyOn(growl, 'warning').and.returnValue(3);
    }));

    it('should be able to reg a user using the scope.register function', function() {

    	scope.register = true;
    	scope.name = 'Gareth Fuller';
    	scope.postCode = 'PE29 2BN';

    	spyOn(scope, 'registerUser').and.callThrough();
    	scope.registerUser();
    	scope.$root.$digest();
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
    	expect(growl.success).toHaveBeenCalled();

		expect(userData.getName()).toEqual('Gareth');
    	expect(userData.getPostCode()).toEqual('NewPost');

    });


});
    