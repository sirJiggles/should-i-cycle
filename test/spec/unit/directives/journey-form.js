'use strict';

describe('Directive: JourneyForm', function () {

    // load the app module
    beforeEach(module('shouldICycleApp'));

    // load the directive template
    beforeEach(module('views/directives/journey-form.html'));


    var $location,
    	scope,
    	growl,
    	element,
    	userData;

    // Initialize the directive and set up the dependancies
    beforeEach(inject(function ($rootScope, $compile, _userData_, _$location_, _growl_) {
        scope = $rootScope.$new();
        userData = _userData_;
        growl = _growl_;
        $location = _$location_;

        // stop functions being called / settup spys
        element = angular.element('<journey-form></journey-form>');
        $compile(element)($rootScope);
        scope.$digest();
        
		spyOn($location, 'path');
        spyOn(growl, 'success').and.returnValue(1);
    	spyOn(growl, 'error').and.returnValue(2);
    	spyOn(growl, 'warning').and.returnValue(3);
    }));

    it('should be able to add a journey to the datastore', function() {
    	scope.journeyTime = '23:00';
    	scope.journeyName = 'Test Journey';

    	spyOn(scope, 'addJourney').and.callThrough();

    	scope.addJourney();

    	expect(scope.addJourney).toHaveBeenCalled();
    	//expect($location.path).toHaveBeenCalledWith('/');
    	//expect(growl.success).toHaveBeenCalledWith('Journey added', {title: 'Success'});
    });
    

    it('should be able to edit a journey', function() {
    	scope.journeyTime = '23:00';
    	scope.journeyName = 'Test Journey';

    	spyOn(scope, 'editJourney').and.callThrough();
    	
    	scope.editJourney();

    	expect(scope.editJourney).toHaveBeenCalled();
    	//expect($location.path).toHaveBeenCalledWith('/');
    	//expect(growl.success).toHaveBeenCalledWith('Journey updated', {title: 'Success'});
    });


});
    