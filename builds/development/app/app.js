$.material.init();

(function () {
	'use strict';

	angular
		.module('ngFit', [
				'ngRoute',
				'ngFit.about',
				'ngFit.contact',
				'ngFit.main'])
		.config('$routeProvider',function ($routeProvider) {
			$routeProvider.
				otherwise({redirectTo: '/'})
	})
	

	
})();