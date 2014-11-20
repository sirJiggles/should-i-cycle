'use strict';

describe('Service: userData', function () {

    // load the controller's module
    beforeEach(module('shouldICycleApp'));

    // Initialize the controller and set up the dependancies
    beforeEach(inject(function (_userData_) {
        this.userData = _userData_;
        this.userData.clearData();
    }));

    // Testing the API for the user data service
    it('should return null if there is no data set in the local storage', function() {
        var data = this.userData.getData();
        expect(data).toBeNull();
    });


    it('should be able to register a user', function() {
        var data = this.userData.registerUser('Gareth Fuller', 'PE29 2BN');
        expect(data).toBeDefined();
        expect(data.registered).toBe(true);
        expect(data.name).toEqual('Gareth Fuller');
        expect(data.postCode).toEqual('PE29 2BN');
    });

    it('should be able to run the getters and setters for the post code', function() {
        this.userData.setPostCode('TestCode');
        var code = this.userData.getPostCode();
        expect(code).toEqual('TestCode');
    });

    it('should be able to run the getters and setters for the name param', function() {
        this.userData.setName('gareth');
        var name = this.userData.getName();
        expect(name).toEqual('gareth');
    });

    it('should be able to run the getters and setters for the registered flag', function() {
        this.userData.setRegistered();
        var regFlag = this.userData.getRegistered();
        expect(regFlag).toBe(true);
    });
    

});
    