'use strict';

describe('Directive: RegisterForm', function () {

    // load the app module
    beforeEach(module('shouldICycleApp'));

    // load the directive template
    beforeEach(module('views/directives/register-form.html'));

    // Initialize the directive and set up the dependancies
    beforeEach(inject(function ($rootScope, $compile, _userData_) {
        this.scope = $rootScope;
        this.userData = _userData_;
        this.element = angular.element('<register-form></register-form>');
        $compile(this.element)($rootScope);
        this.scope.$digest();
    }));

    it('should be able to register a user', function() {
        var data = this.userData.registerUser('Gareth Fuller', 'PE29 2BN');
        expect(data.registered).toBeDefined();
        expect(data.registered).toBeTruthy();
        expect(data.postCode).toBeDefined();
        expect(data.postCode).toEqual('PE29 2BN');
        expect(data.name).toBeDefined();
        expect(data.name).toEqual('Gareth Fuller');
    });


});
    