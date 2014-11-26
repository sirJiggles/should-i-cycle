'use strict';

describe('Controller: RemoveJourneyCtrl', function () {

	var $location,
		scope,
		userData,
		growl,
		routeParams;

  	beforeEach(module('shouldICycleApp'));


    // Initialize the controller and set up the dependancies
    beforeEach(inject(function ($controller, $rootScope, _$location_, _userData_, _growl_) {
        scope = $rootScope.$new();
        userData = _userData_;
        $location = _$location_;
        growl = _growl_;
        routeParams = {id:0};

        // mock a journey and a registered user
		userData.registerUser('Gareth Fuller', 'PE29 2BN');
    	userData.addJourney('07:00', 'Journey One');

    	// stop our funcs being called
        spyOn($location, 'path');
        spyOn(growl, 'success').and.returnValue(1);
    	spyOn(growl, 'error').and.returnValue(2);
    	spyOn(growl, 'warning').and.returnValue(3);

        $controller('RemoveJourneyCtrl', {
            $scope: scope,
            $location: $location,
            userData: userData,
            growl: growl,
           	$routeParams: routeParams
        });
        

    }));

    afterEach(function() {
    	userData.clearData();
	});

    /*it('should redirect if it cannot find the journey', function() {
    	routeParams.id = 111;
    	expect($location.path).toHaveBeenCalledWith('/');
    });*/

    it('should redirect if the cancel func is called', function() {
    	spyOn(scope, 'cancel').and.callThrough();
    	scope.cancel();
    	expect(scope.cancel).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/');
    });

    it('should allow us to remove an item', function(){
    	spyOn(scope, 'removeItem').and.callThrough();
    	routeParams.id = 0;
    	scope.removeItem();
    	expect(scope.removeItem).toHaveBeenCalled();
    	expect($location.path).toHaveBeenCalledWith('/');
    	expect(growl.success).toHaveBeenCalledWith('Journey Removed', {title: 'Success'});
    });


});
    