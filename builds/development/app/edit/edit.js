;(function(){
	'use strict';
	angular
		.module('ngFit.edit',['ngRoute'])
		.config(configEdit)
		.controller('EditCtrl', EditCtrl);
	EditCtrl.$inject = ['$scope','$rootScope','fitfire'];
	function EditCtrl($scope,$rootScope,fitfire){
		var vm = this; //чтобы не путаться в областях видимости
		vm.saveUser = function(){
			fitfire.getUsers(function(_d){
				vm.users = _d;
				var currentUser = fitfire.db.getAuth();
				for (var us in vm.users){
					if (vm.users[us].name == currentUser.github.username){
						fitfire.db.child('Users/'+vm.users[us].$id).update({"name":vm.users[us].name,"age": vm.age,"real_name":vm.real_name,"trainings":""});
					}
				}
			});
		};
		$rootScope.curPath = 'edit';
	}

	configEdit.$inject = ['$routeProvider'];

	function configEdit($routeProvider){
		$routeProvider.
			when("/edit",{
				templateUrl: "app/edit/edit.html",
				controller: 'EditCtrl',
				controllerAs: 'vm'
			});
	}
})();