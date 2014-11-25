'use strict';

describe('Controller: RemoveJourneyCtrl', function () {

    // load the controller's module
    beforeEach(module('shouldICycleApp'));

    // Initialize the controller and set up the dependancies
    beforeEach(inject(function ($controller, $rootScope, $location, _userData_, growl) {
        this.scope = $rootScope.$new();
        this.userData = _userData_;
        this.location = $location;
        this.growl = growl;
        this.routeParams = {id:0};

        // mock a journey and a registered user
		this.userData.registerUser('Gareth Fuller', 'PE29 2BN');
    	this.userData.addJourney('07:00', 'Journey One');

        $controller('RemoveJourneyCtrl', {
            $scope: this.scope,
            $location: this.location,
            userData: this.userData,
            growl: this.growl,
           	$routeParams: this.routeParams
        });
        // stop our funcs being called
        spyOn(this.location, 'path').and.returnValue('Fake location');
        spyOn(this.growl, 'success').and.returnValue(1);
    	spyOn(this.growl, 'error').and.returnValue(2);
    	spyOn(this.growl, 'warning').and.returnValue(3);

    }));

    afterEach(function() {
    	this.userData.clearData();
	});

    it('should redirect if it cannot find the journey', function() {
    	this.rootParams.id = 111;
    	expect(this.location.path).toHaveBeenCalled();
    });

    it('should redirect if the cancel func is called', function() {
    	spyOn(this.scope, 'cancel').and.callThrough();
    	this.scope.cancel();
    	expect(this.scope.cancel).toHaveBeenCalled();
    	expect(this.location.path).toHaveBeenCalled();
    });

    it('should allow us to remove an item', function(){
    	spyOn(this.scope, 'removeItem').and.callThrough();
    	this.routeParams.id = 0;
    	this.scope.removeItem();
    	expect(this.scope.removeItem).toHaveBeenCalled();
    	expect(this.location.path).toHaveBeenCalled();
    	console.log(this.userData.getJourneys());
    });

});
    