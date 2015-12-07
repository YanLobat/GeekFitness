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
		vm.all = true;
		vm.user = {
			name : '',
			age : 0,
			real_name: '',
			trainings: null
		};
		vm.filters = {};
		vm.exercise = {
		};
		var currentUser = fitfire.db.getAuth();
		vm.toggleExercises = function(event){
			if (event){
				event.stopPropagation();
				event.preventDefault();	
			}
			if (vm.all){
				vm.filters.added = vm.name;
			}
			else{
				vm.filters.added = '';
			}
			vm.all = !vm.all;	
			console.log(vm.filters.added);
		};
		vm.addUser = function(){
			fitfire.addUser(vm.user);
		};
		vm.addExercise = function(){
			if (vm.check()){
				vm.exercise = {};
				fitfire.addExercise(vm.exercise,vm.name);
			}
		};
		vm.removeExercise = function(_exercise){
			if (vm.check()){
				fitfire.removeExercise(_exercise);
			}
		};
		vm.check = function(){
			var currentUser = fitfire.db.getAuth();
			if (currentUser){
				vm.name = currentUser.github.username;
				return true;
			}
			else
				return false;
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