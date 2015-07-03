$.material.init();

(function () {
	'use strict';
	//подключение модулей различных страниц
	angular
		.module('ngFit', [
				'ngRoute',
				'ngFit.main',
				'ngFit.fitfire.service',
				'ngFit.about',
				'ngFit.contact'
				])
		.constant('FIREBASE_URL', "https://yanfit.firebaseio.com/")
		.config(Config);
		Config.$inject = ['$routeProvider','$locationProvider','$logProvider'];
		//общий конфиг приложения
		function Config($routeProvider,$locationProvider,$logProvider) {
				$routeProvider.
					otherwise({redirectTo: '/'});
				$locationProvider.html5Mode(true);//возможность убрать # в url Благодаря html5 тегу base в секции head
				$logProvider.debugEnabled(true); //включение дебага в нашем приложениии
		}
})();
;(function(){
	'use strict';
	angular
		.module('ngFit.fitfire.service',['ngRoute','firebase'])
		.service('fitfire', fitfire);
		fitfire.$inject = ['FIREBASE_URL','$firebaseObject','$firebaseArray'];
		function fitfire(FIREBASE_URL,$firebaseObject,$firebaseArray){
			var self = this;

			var db = new Firebase(FIREBASE_URL);
			var db_obj = $firebaseObject(db);

			db_obj.$loaded(function(){
				self.db_obj = db_obj;					
			});
		};
})();