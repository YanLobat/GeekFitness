;(function(){
	'use strict';
	angular
		.module('ngFit.navbar',['ngRoute'])
		.controller('AuthController', AuthController);
	AuthController.$inject = ['$scope','$rootScope'];
	function AuthController($scope,$rootScope){
		var vm = this;
		$rootScope.curPath = 'navbar';
		vm.name = "";
		vm.ref = new Firebase("https://yanfit.firebaseio.com");
		vm.handle = function(promise,event){
        $.when(promise)
            .then(
            	function (authData,event) {
            		if (event){
						console.log('stop');
						event.stopPropagation();
						event.preventDefault();	
					}
        		}, 
        		function (err) {
		            console.log(err);
		        }
		    );
		};
		vm.click = function(event){
			var socialLoginPromise;    
            socialLoginPromise = vm.login(event);
            vm.handle(socialLoginPromise,event);	
		};
		vm.login = function(event){
			var deferred = $.Deferred();
			vm.ref.authWithOAuthPopup("github", function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  }
			  if (authData) {
			  	$scope.$apply(function(){
			  		vm.name = authData.github.username;
			  		console.log(authData.github.username);
			    	console.log("Authenticated successfully with payload:", authData);
			    	deferred.resolve(authData);
			  	});
			  	if (event){
					event.stopPropagation();
					event.preventDefault();	
				}
			  }
			});
			return deferred.promise();
		};
	}
})();

