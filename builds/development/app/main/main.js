;(function(){	
	'use strict';
	angular
		.module('ngFit.main',['ngRoute'])
		.config(configMain)
		.controller('MainCtrl', MainCtrl);

	MainCtrl.$inject = ['$scope','$rootScope','$log','fitfire'];

	function MainCtrl($scope,$rootScope,$log,fitfire){
			$rootScope.login = false;
			var vm = this; //чтобы не путаться в областях видимости

			fitfire.getUsers(function(_d){
				vm.users = _d;
			});
			fitfire.getExercises(function(_d){
				vm.exercises = _d;
			});
			vm.user = {
				name : null,
				age : 0
			};
			vm.exercise = {
				full_name: null
			}
			vm.addUser = function(){
				fitfire.addUser(vm.user);
			};
			vm.addExercise = function(){
				if ($rootScope.login){
					vm.author = $rootScope.name;
					fitfire.addExercise(vm.exercise);
				}
			};
			$rootScope.curPath = 'main';//что-то вроде глобальной переменной для использования во вьюхах

	}

	configMain.$inject = ['$routeProvider'];

	function configMain($routeProvider){
		$routeProvider.
			when("/",{
				templateUrl: "app/main/main.html",
				controller: 'MainCtrl',
				controllerAs: 'vm'
			});
	}
})();