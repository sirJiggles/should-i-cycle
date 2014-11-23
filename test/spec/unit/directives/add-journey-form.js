'use strict';

describe('Directive: AddJourneyForm', function () {

    // load the app module
    beforeEach(module('shouldICycleApp'));

    // load the directive template
    beforeEach(module('views/directives/add-journey-form.html'));

    // Initialize the directive and set up the dependancies
    beforeEach(inject(function ($rootScope, $compile, _userData_) {
        this.scope = $rootScope;
        this.userData = _userData_;
        this.element = angular.element('<add-journey-form></add-journey-form>');
        $compile(this.element)($rootScope);
        this.scope.$digest();
    }));

    it('should be able to add a journey to the datastore', function() {
        this.userData.addJourney('05:20', 'Test name for the journey');
        var journey = this.userData.getJourney(0);
        expect(journey.time).toBe('05:20');
        expect(journey.name).toBe('Test name for the journey');
    });

});
    