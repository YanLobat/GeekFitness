;(function(){
	'use strict';
	angular
		.module('ngFit.contact',['ngRoute'])
		.config(configContact)
		.controller('ContactCtrl', ContactCtrl);

	ContactCtrl.$inject = ['$scope','$rootScope'];

	function ContactCtrl($scope,$rootScope,$log){
		var vm = this; //чтобы не путаться в областях видимости

		$rootScope.curPath = 'contact';
		vm.title = "Контакты";
	}

	configContact.$inject = ['$routeProvider'];

	function configContact($routeProvider){
		$routeProvider.
			when("/contact",{
				templateUrl: "app/contact/contact.html",
				controller: 'ContactCtrl',
				controllerAs: 'vm'
			});
	}
})();