'use strict';

describe('Directive: JourneyForm', function () {

    // load the app module
    beforeEach(module('shouldICycleApp'));

    // load the directive template
    beforeEach(module('views/directives/journey-form.html'));

    // Initialize the directive and set up the dependancies
    beforeEach(inject(function ($rootScope, $compile, _userData_) {
        this.scope = $rootScope;
        this.userData = _userData_;
        this.element = angular.element('<add-journey-form></add-journey-form>');
        $compile(this.element)($rootScope);
        this.scope.$digest();
    }));

    it('should be able to add a journey to the datastore', function() {
        this.userData.addJourney('05:40', 'Test name for the journey');
        var journey = this.userData.getJourney(0);
        expect(journey.time).toBe('05:40');
        expect(journey.name).toBe('Test name for the journey');
    });

    it('should be able to edit a journeys time in the datastore', function() {
    	var options = {
    		id: 0,
    		time: '05:10'
    	};
    	this.userData.editJourney(options);
    	var journey = this.userData.getJourney(0);
    	expect(journey.time).toBe('05:10');
    	expect(journey.name).toBe('Test name for the journey');
    });

    it('should be able to edit a journeys name in the datastore', function(){
    	var options = {
    		id: 0,
    		name: 'Rename test'
    	};
    	this.userData.editJourney(options);
    	var journey = this.userData.getJourney(0);
    	expect(journey.time).toBe('05:10');
    	expect(journey.name).toBe('Rename test');
    });

    it('should be able to edit both name and time for a journey', function() {
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
    	var options = {
    		id: 2,
    		name: 'something'
    	};
    	var journeyEditAction = this.userData.editJourney(options);
    	expect(journeyEditAction).toBe(false);
    });

    it('should return false if there is no name or time in the edit options', function() {
    	var options = {
    		id: 0
    	};
    	var journeyEditAction = this.userData.editJourney(options);
    	expect(journeyEditAction).toBe(false);
    });

    it('should return false if there is no ID in the options obj', function() {
    	var options = {
    		time: '05:10',
    		name: 'something'
    	};
    	var journeyEditAction = this.userData.editJourney(options);
    	expect(journeyEditAction).toBe(false);
    });


});
    