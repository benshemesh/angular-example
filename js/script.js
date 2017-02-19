var myApp = angular.module('myApp',[]);

myApp.service('cityService', function(){
	this.test = function(){
		return 'cityService';
	}
});

myApp.controller('mainCtrl', function($scope, $http, cityService) {
		
		$scope.visibility = "hide";
		$scope.lastSearch = [];
		
		$http.get('http://api.openweathermap.org/data/2.5/weather?appid=ef4193458505402f997a2f13c8109da4&q=tel aviv&units=metric')
				   .then(function(res){
					   $scope.proccessData(res);
					});
		
		$scope.searchForCity = function(){
			$http.get('http://api.openweathermap.org/data/2.5/weather?appid=ef4193458505402f997a2f13c8109da4&q='+$scope.searchCity+'&units=metric')
				   .then(function(res){
					   $scope.changeClass();
					   $scope.proccessData(res);
					});
		}
		
		$scope.originalCity = function(){
			$http.get('http://api.openweathermap.org/data/2.5/weather?appid=ef4193458505402f997a2f13c8109da4&q=telaviv&units=metric')
				   .then(function(res){
					   $scope.proccessData(res);
					   $scope.visibility = "hide";
					});
		}
		$scope.proccessData = function(res){
			$scope.citiesData = res.data;
			$scope.thisCity =  $scope.citiesData.name;
			$scope.thisTemp = Math.round($scope.citiesData.main.temp);
			$scope.humidity = $scope.citiesData.main.humidity;
			$scope.tempMax = $scope.citiesData.main.temp_max;
			$scope.tempMin = $scope.citiesData.main.temp_min;
			$scope.country = $scope.citiesData.sys.country;
			$scope.icon = "http://openweathermap.org/img/w/"+$scope.citiesData.weather[0].icon+".png";
			$scope.addlastSearch($scope.thisCity);
			$scope.searchCity = "";
			
		}
		$scope.addlastSearch = function(city){
			var counter = 0;
			for (var i = 0; i < $scope.lastSearch.length; i++) {
					if (city == $scope.lastSearch[i]){
						counter = 1;
					}
			}
			if (counter == 1){
				counter=0;
			}
			else(
				$scope.lastSearch.push(city)
			)
		}
		$scope.searchPlaceholder = "Search for city";
		$scope.checkBox = "search by city and country code";
		$scope.checkSearch = function(){
			if ($scope.searchBy == false){
				$scope.searchPlaceholder = "Search for city";
			}
			else{
				$scope.searchPlaceholder = "City and country code (for example: London,uk )";
			}
		}
		$scope.searchAgain = function(){
			$scope.searchCity = this.city;
			$scope.searchForCity();
		}
		$scope.changeClass = function(){
			if ($scope.visibility === "hide")
			  $scope.visibility = "animate";
		  };
});

/****enter for submit****/
myApp.directive('myEnter', function () {
    return function ($scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                $scope.$apply(function (){
                    $scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});

/****reverse list for latest search****/
myApp.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

