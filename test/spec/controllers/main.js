'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('canIcycleApp'));

    var MainCtrl,
        apiService,
        scope,
        q,
        deferred,
        http;
    
    // Mock the service that it uses (weather API)
    beforeEach(function() {
        
        apiService = { 
            APIEndPoint: 'http://api.worldweatheronline.com/free/v2/weather.ashx?q=',
            APIKey: '39599866ca63e00d5c52e853caeb2',
            
            getPostCodeData: function(postCode) {
                // uri encode the post code for the API
                var encodedPostCode = encodeURIComponent(postCode);

                // create our own promise for the http get :D
                deferred = q.defer();

                http.get(apiService.APIEndPoint+encodedPostCode+'&format=json&num_of_days=5&key='+apiService.APIKey).
                    success(function(data) { 
                        deferred.resolve(data);
                    }).error(function(msg) {
                        deferred.reject(msg);
                    });

                return deferred.promise;
            }
        };
        
    });

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $q, $http) {
        scope = $rootScope.$new();
        q = $q;
        http = $http;
        MainCtrl = $controller('MainCtrl', {
            $scope: scope,
            worldWeatherOnline: apiService
        });
    }));

    
    it('should call the services function when get weather is called', function() {
        // spy on the api service's get postcodedata function
        spyOn(apiService, 'getPostCodeData');
        // run the get weather func in scope
        scope.getWeather('PE29 2BN');
        // make sure it was called
        expect(apiService.getPostCodeData).toHaveBeenCalled();
    });  
    
    it('should be able to get data from the weather service API', function() {
        
        scope.getWeather('PE29 2BN');
        expect(scope.weatherData.data).toBeDefined();
        // should have first day of weather
        expect(scope.weatherData.data.data.weather[0]).toBeDefined();
        
        // should have last day of weather
        expect(scope.weatherData.data.data.weather[4]).toBeDefined();
        
    });
    
    /*it('should error if it cannot connect to the weather API', function() {
        // change the api end point
        apiService.APIEndPoint = 'http://not-going-to-work.com/?';
        expect(apiService.getPostCodeData('PE29 2BN')).toThrow();
    });*/

});
    