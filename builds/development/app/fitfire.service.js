;(function(){
	'use strict';
	angular
		.module('ngFit.fitfire.service',['firebase'])
		.service('fitfire', fitfire);
		fitfire.$inject = ['$rootScope','FIREBASE_URL','$firebaseObject','$firebaseArray'];
		function fitfire($rootScope,FIREBASE_URL,$firebaseObject,$firebaseArray){
			var vm = this;

			vm.db = new Firebase(FIREBASE_URL);
			var db_obj = $firebaseObject(vm.db);
			var db_arr = $firebaseArray(vm.db);

			var users_obj = vm.db.child('Users');
			var users_arr = $firebaseArray(users_obj);
			var exercises_obj = vm.db.child('Exercises');
			var exercises_arr = $firebaseArray(exercises_obj);
			this.isUser = function(name){
				console.log(users_arr[0]);
			};
			this.getUsers = function(cb){
				return users_arr.$loaded(cb);
			};
			this.getExercises = function(cb){
				return exercises_arr.$loaded(cb);
			};
			db_obj.$loaded(function(){
				vm.db_obj = db_obj;					
			});
			this.addUser = function(_user){
				users_obj.push(_user);
			};
			this.addExercise = function(_exercise){
				_exercise.added = $rootScope.name;
				exercises_obj.push(_exercise);
			};
		};
})();