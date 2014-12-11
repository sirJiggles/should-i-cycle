'use strict';

/**
 * @ngdoc directive
 * @name shouldICycleApp.journeys
 * @description
 * # journeys
 * Directive in the shouldICycleApp.
 */
angular.module('shouldICycleApp')
	.directive('journeys', function ($location, userData) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/journeys.html',
			link: function(scope) {
				// data we will be working with
				var data = userData.getData();

				// function for the logic on testing if the weather is ok or not
				var _getWeatherClass = function(data) {
						var type = '',
							rain = parseInt(data.chanceofrain),
							wind = parseInt(data.windspeedMiles),
							temp = parseInt(data.tempC);

						if (rain > 20 || temp < 0 || wind > 20) {
							type = 'bad';
						} else if ( (rain < 21 && rain > 12) || 
									(temp > 0 && temp < 10) || 
									(wind < 21 && wind > 10) ){
							type = 'ok';
						} else {
							type = 'good';
						}

						return type;
				};

				var _getWeatherIcon = function(code){
					var weatherIcon  = '';
					// logic for working out which weather icon to use (based on the weather code from the API)
  					if(code === 395 || code === 392) {
						weatherIcon = 'wi-day-snow-thunderstorm';
  					} else if (code === 389) {
						weatherIcon = 'wi-thunderstorm';
  					} else if (code === 386) {
  						weatherIcon = 'wi-storm-showers';
  					} else if (code === 377 || code === 374 || code === 350) {
  						weatherIcon = 'wi-hail';
  					} else if (code === 371 || code === 368 || code === 338 || code === 335 || code === 332 || code === 329 || code === 326 || code === 323 || code === 230 || code === 227 || code === 179) {
  						weatherIcon = 'wi-snow';
  					} else if (code === 365 || code === 362 || code === 317 || code === 314 || code === 311 || code === 284 || code === 281 || code === 182) {
  						weatherIcon = 'wi-sleet';
  					} else if (code === 359 || code === 356 || code === 308 || code === 305 || code === 302 || code === 209) {
  						weatherIcon = 'wi-rain';
  					} else if (code === 353 || code === 296 || code === 293 || code === 266 || code === 263 || code === 185 || code === 176) {
  						weatherIcon = 'wi-showers';
  					} else if (code === 260 || code === 248 || code === 143) {
  						weatherIcon = 'wi-fog';
  					} else if (code === 200) {
  						weatherIcon = 'wi-lightning';
  					} else if (code === 122 || code === 119 || code === 116) {
  						weatherIcon = 'wi-cloudy';
  					} else if (code === 113) {
  						weatherIcon = 'wi-day-sunny';
  					} else {
  						weatherIcon = 'wi-meteor';
  					}

  					return weatherIcon;
				};

				var _getWindDirIcon = function(dir) {

					var windDirIcon = '';

					if(dir < 15) {
  						windDirIcon = 'wi-wind-default _0-deg';
  					} else if (dir < 30) {
							windDirIcon = 'wi-wind-default _15-deg';
  					} else if (dir < 45) {
							windDirIcon = 'wi-wind-default _30-deg';
  					} else if (dir < 60) {
  						windDirIcon = 'wi-wind-default _45-deg';
  					} else if (dir < 75) {
  						windDirIcon = 'wi-wind-default _60-deg';
  					} else if (dir < 90) {
  						windDirIcon = 'wi-wind-default _75-deg';
  					} else if (dir < 105) {
  						windDirIcon = 'wi-wind-default _90-deg';
  					} else if (dir < 120) {
  						windDirIcon = 'wi-wind-default _105-deg';
  					} else if (dir < 135) {
  						windDirIcon = 'wi-wind-default _120-deg';
  					} else if (dir < 150) {
  						windDirIcon = 'wi-wind-default _135-deg';
  					} else if (dir < 165) {
  						windDirIcon = 'wi-wind-default _150-deg';
  					} else if (dir < 180) {
  						windDirIcon = 'wi-wind-default _165-deg';
  					} else if (dir < 195) {
  						windDirIcon = 'wi-wind-default _180-deg';
  					} else if (dir < 210) {
  						windDirIcon = 'wi-wind-default _195-deg';
  					} else if (dir < 225) {
  						windDirIcon = 'wi-wind-default _210-deg';
  					} else if (dir < 240) {
  						windDirIcon = 'wi-wind-default _225-deg';
  					} else if (dir < 255) {
  						windDirIcon = 'wi-wind-default _240-deg';
  					} else if (dir < 270) {
  						windDirIcon = 'wi-wind-default _255-deg';
  					} else if (dir < 285) {
  						windDirIcon = 'wi-wind-default _270-deg';
  					} else if (dir < 300) {
  						windDirIcon = 'wi-wind-default _285-deg';
  					} else if (dir < 315) {
  						windDirIcon = 'wi-wind-default _300-deg';
  					} else if (dir < 330) {
  						windDirIcon = 'wi-wind-default _315-deg';
  					} else if (dir < 345) {
  						windDirIcon = 'wi-wind-default _330-deg';
  					} else {
  						windDirIcon = 'wi-wind-default _345-deg';
  					}

  					return windDirIcon;
				};


				// if we have some weather data we will contruct an array that our journeys directive will use
		  		if(data.weather && data.journeys) {
		  			if(data.journeys.length > 0) {
	  					// our tmp container
		  				var weather = [],
		  					dayIndex = 0,
		  					currentTime = new Date().getHours();

		  				for (var i = 0; i < data.journeys.length; i++) {

		  					weather[i] = {};

		  					// first we will work out which section of the weather hours array we need
		  					var journeyTime = new Date(data.journeys[i].time).getHours(),
		  						hourSeg = 0,
		  						diff = currentTime - journeyTime;

  							// check journey time has already passed by 1 hour (avrg journey time)
							dayIndex = (diff >= 1) ? 1 : 0;

							// so we can display what day the weather is for
							weather[i].day = (dayIndex === 0) ? 'Today' : 'Tomorrow';

	  						if(journeyTime <= 2) {
	  							hourSeg = 0;
	  						} else if(journeyTime > 3 && journeyTime <= 5) {
	  							hourSeg = 1;
	  						} else if(journeyTime > 5 && journeyTime <= 8) {
	  							hourSeg = 2;
	  						} else if(journeyTime > 8 && journeyTime <= 11) {
	  							hourSeg = 3;
	  						} else if(journeyTime > 11 && journeyTime <= 14) {
	  							hourSeg = 4;
	  						} else if(journeyTime > 14 && journeyTime <= 17) {
	  							hourSeg = 5;
	  						} else if(journeyTime > 17 && journeyTime <= 20) {
	  							hourSeg = 6;
	  						} else if(journeyTime > 20 && journeyTime <= 23) {
	  							hourSeg = 7;
	  						}

	  						// now we can set some values
	  						weather[i].chanceofrain = data.weather[dayIndex].hourly[hourSeg].chanceofrain;
	  						weather[i].tempC = data.weather[dayIndex].hourly[hourSeg].tempC;
	  						weather[i].windspeedMiles = data.weather[dayIndex].hourly[hourSeg].windspeedMiles;
	  						weather[i].winddir16Point = data.weather[dayIndex].hourly[hourSeg].winddir16Point;
	  						weather[i].descr = data.weather[dayIndex].hourly[hourSeg].weatherDesc[0].value;
		  					weather[i].icon = _getWeatherIcon(parseInt(data.weather[dayIndex].hourly[hourSeg].weatherCode));
		  					weather[i].windDirIcon = _getWindDirIcon(parseInt(data.weather[dayIndex].hourly[hourSeg].winddirDegree)); 

		  					// based on, for now some hard set values we wil set a traffic light logic for the color of the weather data
	  						weather[i].weatherClass = _getWeatherClass(data.weather[dayIndex].hourly[hourSeg]);
		  
		  				}

		  				// now assign the var to the scope
		  				scope.weather = weather;
		  			}
		  		}
			}
		};
	});