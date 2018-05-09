var dgMovieApp = angular.module('dgMovieApp', [])
	.controller("mainCtrl", function($scope, $http) {  

		$scope.nineties = false;
		$scope.twoThousands = false;

		$scope.toggleNineties = function() {
			$scope.twoThousands = false;
			if ($scope.nineties) {
				$scope.nineties = false;
			} else {
				$scope.nineties = true;
			}
		}


		$scope.toggleTwoThousands = function() {
			$scope.nineties = false;
			if ($scope.twoThousands) {
				$scope.twoThousands = false;
			} else {
				$scope.twoThousands = true;
			}
		}


    	$http.get("http://www.omdbapi.com/?s=Batman&apikey=72c4b4ee&")
        	.success(function(response) {
	          	$scope.response = response;
	          	$scope.movies = response.Search;
	          	$scope.imdbIds = [];

				angular.forEach($scope.movies, function(value) {
				  $scope.imdbIds.push(value.imdbID)

				});

				$scope.allMovies = [];
				$scope.moviesWithDetailNineties = [];
				$scope.moviesWithDetailTwoThousands = [];


				angular.forEach($scope.movies, function(value) {
				  	var movieId = value.imdbID;
	        		$http.get("http://www.omdbapi.com/?i="+ movieId +"&apikey=72c4b4ee&")
			        	.success(function(response) {
			        		var getYear = response.Released.substr(7);
			     			if (getYear < 2000 && getYear > 1989){
								$scope.moviesWithDetailNineties.push(response);
			     			} else if (getYear > 1999){
								$scope.moviesWithDetailTwoThousands.push(response);
			     			} 
			        		$scope.allMovies.push(response);

			        	})
			        	.error(function(response) {
				          	$scope.message = "Error!!";
			        	}); 

				});
        	})

        	.error(function(response) {
	          	$scope.message = "Unsuccessful attempt to reach IMDB";
        	}); 
       
    });

angular.module('dgMovieApp').component('movieInfo', {
	templateUrl: 'template.html',
	bindings:{
	 movie: '=' //one way data binding
	},
	controller: function(){
	}
})





