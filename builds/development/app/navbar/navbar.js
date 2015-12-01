;(function(){
	'use strict';
	angular
		.module('ngFit.navbar',['ngRoute'])
		.controller('AuthController', AuthController);
	AuthController.$inject = ['$scope','$rootScope','FIREBASE_URL','fitfire'];
	function AuthController($scope,$rootScope,FIREBASE_URL,fitfire){
		var vm = this;
		$rootScope.curPath = 'navbar';
		vm.name = "";
		vm.ref = new Firebase(FIREBASE_URL);
		vm.handle = function(promise,event){
        $.when(promise)
            .then(
            	function (authData,event) {
            		if (event){
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
			    	fitfire.isUser(vm.name);
			    	$rootScope.login = true;
			  	});
			  	if (event){
					event.stopPropagation();
					event.preventDefault();	
				}
			  }
			});
			return deferred.promise();
		};
		vm.logout = function(event){
			if (event){
				event.stopPropagation();
				event.preventDefault();	
			}
			vm.ref.unauth();
		};
		vm.check = function(){
			var currentUser = fitfire.db.getAuth();
			if (currentUser){
				vm.name = currentUser.github.username;
				return true;
			}
			else
				return false;
		}
	}
})();

