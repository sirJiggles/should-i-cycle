'use strict';

describe('Directive: JourneyForm', function () {

    // load the app module
    beforeEach(module('shouldICycleApp'));

    // load the directive template
    beforeEach(module('views/directives/journey-form.html'));

    // Initialize the directive and set up the dependancies
    beforeEach(inject(function ($rootScope, $compile, _userData_, $location, growl) {
        this.scope = $rootScope.$new();
        this.userData = _userData_;
        this.growl = growl;
        this.location = $location;
        this.element = angular.element('<journey-form></journey-form>');
        $compile(this.element)($rootScope);
        this.scope.$digest();
        // stop functions being called
        spyOn(this.location, 'path').and.returnValue('Fake location');
        spyOn(this.growl, 'success').and.returnValue(1);
    	spyOn(this.growl, 'error').and.returnValue(2);
    	spyOn(this.growl, 'warning').and.returnValue(3);
    }));


    it('should be able to add a journey to the datastore', function() {
    	this.scope.journeyTime = '23:00';
    	this.scope.journeyName = 'Test Journey';

    	spyOn(this.scope, 'addJourney').and.callThrough();

    	this.scope.addJourney();
    	this.scope.$root.$digest();

    	expect(this.scope.addJourney).toHaveBeenCalled();
    });
    

    it('should be able to edit a journey', function() {
    	this.scope.journeyTime = '23:00';
    	this.scope.journeyName = 'Test Journey';

    	spyOn(this.scope, 'editJourney').and.callThrough();
    	
    	this.scope.editJourney();
    	this.scope.$root.$digest();

    	expect(this.scope.editJourney).toHaveBeenCalled();
    });


});
    