angular.module('ngFit.main',['ngRoute'])

.config(['$routeProvider',function($routeProvider){
	$routeProvider.
		when("/",{
			templateUrl: "app/main/main.html",
			controller: 'MainCtrl'
		});
}])

.controller('MainCtrl', 
 ['$scope', function($scope){
	$scope.title = "Это наш первый scope title";
}])