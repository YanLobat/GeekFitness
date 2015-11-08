;(function(){
	'use strict';
	angular
		.module('ngFit.navbar',[
				   'ngRoute'
		])
		.controller('AuthController', AuthController);

	function AuthController($scope){
		var vm = this;
		vm.name = null;
		vm.login = function(){
			var ref = new Firebase("https://yanfit.firebaseio.com");
			ref.authWithOAuthPopup("github", function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			  	vm.name = authData.github.username;
			  	console.log(authData.github.username);
			    console.log("Authenticated successfully with payload:", authData);
			  }
			})
		}
	}
})();

