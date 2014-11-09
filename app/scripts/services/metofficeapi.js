'use strict';

/**
 * @ngdoc service
 * @name canIcycleApp.metOfficeApi
 * @description
 * # metOfficeApi
 * Service in the canIcycleApp.
 */
angular.module('canIcycleApp')
	.service('metOfficeApi', function ($http) {

		var APIEndPoint = 'http://datapoint.metoffice.gov.uk/public/data/val/',
			APIKey = '40d2de00-fe53-4c5f-a256-e532a25f7b19';

		// get weather for location
		this.getPostCodeData = function(locationId) {
			$http.get(APIEndPoint+'wxfcs/all/json/'+locationId+'?res=3hourly&key='+APIKey)
					.success(function(data) {
						return data;
        			});
		};

    	
	});
