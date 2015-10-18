;(function(){
	'use strict';
	angular
		.module('ngFit.fitfire.service',['firebase'])
		.service('fitfire', fitfire);
		fitfire.$inject = ['FIREBASE_URL','$firebaseObject','$firebaseArray'];
		function fitfire(FIREBASE_URL,$firebaseObject,$firebaseArray){
			var self = this;

			var db = new Firebase(FIREBASE_URL);
			var db_obj = $firebaseObject(db);
			var db_arr = $firebaseArray(db);

			var users_obj = db.child('Users');
			var users_arr = $firebaseArray(users_obj);
			this.getUsers = function(cb){
				return users_arr.$loaded(cb);
			};
			db_obj.$loaded(function(){
				self.db_obj = db_obj;					
			});
			this.addUser = function(_user){
				users_obj.push(_user)
			};
		};
})();