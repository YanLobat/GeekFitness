;(function(){
	'use strict';
	angular
		.module('ngFit.trainings',['ngRoute'])
		.config(configTrainings)
		.controller('TrainingsCtrl', TrainingsCtrl);
	TrainingsCtrl.$inject = ['$scope','$rootScope','fitfire'];
	function TrainingsCtrl($scope,$rootScope,fitfire){
		var vm = this; //чтобы не путаться в областях видимости
		vm.names = [];
		vm.parts = [''];
		vm.selected = [];
		vm.weight = [];
		vm.count = [];
		fitfire.getExercises(function(_d){
				vm.exercises = _d;
				for (var ex in vm.exercises){
					if (typeof vm.exercises[ex] == 'object')
						vm.names[ex] = vm.exercises[ex].full_name;
				}
				console.log(vm.names);
		});
		vm.more = function(){
			++vm.parts.length;
		};
		vm.addTraining = function(){
			vm.part = [
			];
			for (var i = 0; i < vm.selected.length; i++){
				var temp = {};
				temp.exercise = vm.selected[i];
				temp.weight = vm.weight[i];
				temp.count = vm.count[i];
				vm.part.push(temp);
			}
			var time = new Date();
			var curr_date = time.getDate();
			var curr_month = time.getMonth() + 1;
			var curr_year = time.getFullYear();
			time = curr_year + "-" + curr_month + "-" + curr_date;
			fitfire.getUsers(function(_d){
				vm.users = _d;
				var currentUser = fitfire.db.getAuth();
				for (var us in vm.users){
					if (vm.users[us].name == currentUser.github.username){
						var training = {};
						training[time] = vm.part;
						console.log(training);
						fitfire.db.child('Users/'+vm.users[us].$id).update({"name":vm.users[us].name,
																			"age": vm.users[us].age,
																			"real_name":vm.users[us].real_name,
																			"trainings": training});
					}
				}
			});
		};
		$rootScope.curPath = 'trainings';
	}

	configTrainings.$inject = ['$routeProvider'];

	function configTrainings($routeProvider){
		$routeProvider.
			when("/trainings",{
				templateUrl: "app/trainings/trainings.html",
				controller: 'TrainingsCtrl',
				controllerAs: 'vm'
			});
	}
})();