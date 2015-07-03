;(function(){
	'use strict';
	angular
		.module('ngFit.about',['ngRoute'])
		.config(configAbout)
		.controller('AboutCtrl',AboutCtrl);

	AboutCtrl.$inject = ['$scope','$rootScope'];

	function AboutCtrl($scope,$rootScope,$log){
		var vm = this; //чтобы не путаться в областях видимости(не забывать в конфиге про контроллер эз)

		$rootScope.curPath = 'about';

		vm.title = "О нас";
	}

	configAbout.$inject = ['$routeProvider'];

	function configAbout($routeProvider){
		$routeProvider.
			when("/about",{
				templateUrl: "app/about/about.html",
				controller: 'AboutCtrl',
				controllerAs: 'vm'
			});
	}
})();