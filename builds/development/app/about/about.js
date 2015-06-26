angular.module('ngFit.about',['ngRoute'])

.config(['$routeProvider',function($routeProvider){
	$routeProvider.
		when("/about",{
			templateUrl: "app/about/about.html",
			controller: 'AboutCtrl'
		});
}])

.controller('AboutCtrl', ['$scope', function($scope){
	$scope.title = "Это itle";
}])