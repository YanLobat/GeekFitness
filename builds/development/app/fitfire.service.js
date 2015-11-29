;(function(){
	'use strict';
	angular
		.module('ngFit.fitfire.service',['firebase'])
		.service('fitfire', fitfire);
		fitfire.$inject = ['$rootScope','FIREBASE_URL','$firebaseObject','$firebaseArray'];
		function fitfire($rootScope,FIREBASE_URL,$firebaseObject,$firebaseArray){
			var self = this;

			var db = new Firebase(FIREBASE_URL);
			var db_obj = $firebaseObject(db);
			var db_arr = $firebaseArray(db);

			var users_obj = db.child('Users');
			var users_arr = $firebaseArray(users_obj);
			var exercises_obj = db.child('Exercises');
			var exercises_arr = $firebaseArray(exercises_obj);
			this.getUsers = function(cb){
				return users_arr.$loaded(cb);
			};
			this.getExercises = function(cb){
				return exercises_arr.$loaded(cb);
			};
			db_obj.$loaded(function(){
				self.db_obj = db_obj;					
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