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
    	$routeParams,
    	userData;

    // Initialize the directive and set up the dependancies
    beforeEach(inject(function ($rootScope, $compile, _userData_, _$location_, _growl_, _$routeParams_) {
        scope = $rootScope.$new();
        userData = _userData_;
        growl = _growl_;
        $location = _$location_;
        $routeParams = _$routeParams_;

        userData.registerUser('Gareth Fuller', 'PE29 2BN');

        // stop functions being called / settup spys
        element = angular.element('<journey-form></journey-form>');
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

    it('should throw an error if there is no name set on the scope - on adding', function(){
    	scope.journeyTime = '23:20';
    	scope.journeyName = '';
    	spyOn(scope, 'addJourney').and.callThrough();

    	scope.addJourney();

    	expect(scope.addJourney).toHaveBeenCalled();
    	expect(growl.error).toHaveBeenCalledWith('Unable to add journey! Please try again', {title: 'Error'});
    });

    it('should throw an error if there is no time set on the scope - on adding', function(){
    	scope.journeyTime = '';
    	scope.journeyName = 'Some Name';
    	spyOn(scope, 'addJourney').and.callThrough();

    	scope.addJourney();

    	expect(scope.addJourney).toHaveBeenCalled();
    	expect(growl.error).toHaveBeenCalledWith('Unable to add journey! Please try again', {title: 'Error'});
    });

    it('should be able to add a journey to the datastore', function() {
    	scope.journeyTime = '23:00';
    	scope.journeyName = 'Test Journey';

    	spyOn(scope, 'addJourney').and.callThrough();

    	scope.addJourney();

    	expect(scope.addJourney).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/');
    	expect(growl.success).toHaveBeenCalledWith('Journey added', {title: 'Success'});
    	
    });

    it('should alow the user to cacel editing / adding a journey', function() {
    	scope.cancel();
    	expect($location.path).toHaveBeenCalledWith('/');
    });

    it('should error if the user tries to edit a journey with no name', function(){
    	userData.addJourney('07:00', 'Journey One');
    	$routeParams.id = 0;
    	scope.journeyTime = '23:00';
    	scope.journeyName = '';

    	spyOn(scope, 'editJourney').and.callThrough();
    	
    	scope.editJourney();

    	expect(scope.editJourney).toHaveBeenCalled();
    	expect(growl.error).toHaveBeenCalledWith('Unable to edit journey! Please try again', {title: 'Error'});
    });

    it('should error if the user tries to edit a journey with no time', function(){
    	userData.addJourney('07:00', 'Journey One');
    	$routeParams.id = 0;
    	scope.journeyTime = '';
    	scope.journeyName = 'Test Journey Edit';
    	spyOn(scope, 'editJourney').and.callThrough();
    	
    	scope.editJourney();

    	expect(scope.editJourney).toHaveBeenCalled();
    	expect(growl.error).toHaveBeenCalledWith('Unable to edit journey! Please try again', {title: 'Error'});
    });
    
    it('should be able to edit a journey', function() {
    	userData.addJourney('07:00', 'Journey One');
    	$routeParams.id = 0;
    	scope.journeyTime = '23:00';
    	scope.journeyName = 'Test Journey Edit';

    	spyOn(scope, 'editJourney').and.callThrough();
    	
    	scope.editJourney();

    	expect(scope.editJourney).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/');
    	expect(growl.success).toHaveBeenCalledWith('Journey updated', {title: 'Success'});
    });

});
    