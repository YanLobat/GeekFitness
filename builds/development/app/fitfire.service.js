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

			db_obj.$loaded(function(){
				vm.db_obj = db_obj;					
			});

			vm.isUser = function(name){
				var is = false;
				users_obj.once("value",function(snapshot){
					var data = snapshot.val();
					for (var user in data){
						if (data[user].name == name){
							is = true;
						}
					}
				});
				if (!is){
					vm.addUser({"name":name,"age":"","real_name":"","trainings":""});
				}
			};
			vm.getUsers = function(cb){
				return users_arr.$loaded(cb);
			};
			vm.getExercises = function(cb){
				return exercises_arr.$loaded(cb);
			};
			vm.addUser = function(_user){
				console.log(_user);
				users_obj.push(_user);
			};
			vm.addExercise = function(_exercise,_user){
				_exercise.added = _user;
				exercises_obj.push(_exercise);
			};
			vm.removeExercise = function(_exercise){
				var exercise_url = FIREBASE_URL+'Exercises/'+_exercise.$id;
				var removing_exercise = new Firebase(exercise_url);
				removing_exercise.remove(

					function(error) {
  if (error) {
    console.log('Synchronization failed');
  } else {
    console.log('Synchronization succeeded');
  }
}
				);
			};
		};
})();