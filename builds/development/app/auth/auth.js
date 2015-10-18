;(function(){
	"use strict";
	angular
		.module('ngFit.auth', ['firebase'])
		.controller('AuthCtrl',AuthCtrl);

		AuthCtrl.$inject = ['$scope','$rootScope','$firebaseAuth'];

		function AuthCtrl($scope,$rootScope,$firebaseAuth){
			var ref = new Firebase("https://yanfit.firebaseio.com");
		    var auth = $firebaseAuth(ref);

		    $scope.login = function() {
		      $scope.authData = null;
		      $scope.error = null;

		      auth.$authAnonymously().then(function(authData) {
		        $scope.authData = authData;
		      }).catch(function(error) {
		        $scope.error = error;
		      });
		    };
		}
})();
