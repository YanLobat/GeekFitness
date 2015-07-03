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
		.module('ngFit.fitfire.service',['firebase'])
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
;(function(){
	'use strict';
	angular
		.module('ngFit.about',['ngRoute'])
		.config(configAbout)
		.controller('AboutCtrl',AboutCtrl);

	AboutCtrl.$inject = ['$scope','$rootScope'];

	function AboutCtrl($scope,$rootScope,$log){
		var vm = this; //чтобы не путаться в областях видимости(не забывать в конфиге про контроллер эз)

		$rootScope.curPath = 'about';

		vm.title = "О нас";
	}

	configAbout.$inject = ['$routeProvider'];

	function configAbout($routeProvider){
		$routeProvider.
			when("/about",{
				templateUrl: "app/about/about.html",
				controller: 'AboutCtrl',
				controllerAs: 'vm'
			});
	}
})();
;(function(){
	'use strict';
	angular
		.module('ngFit.contact',['ngRoute'])
		.config(configContact)
		.controller('ContactCtrl', ContactCtrl);

	ContactCtrl.$inject = ['$scope','$rootScope'];

	function ContactCtrl($scope,$rootScope,$log){
		var vm = this; //чтобы не путаться в областях видимости

		$rootScope.curPath = 'contact';
		vm.title = "Контакты";
	}

	configContact.$inject = ['$routeProvider'];

	function configContact($routeProvider){
		$routeProvider.
			when("/contact",{
				templateUrl: "app/contact/contact.html",
				controller: 'ContactCtrl',
				controllerAs: 'vm'
			});
	}
})();
;(function(){	
	'use strict';
	angular
		.module('ngFit.main',['ngRoute'])
		.config(configMain)
		.controller('MainCtrl', MainCtrl);

	MainCtrl.$inject = ['$scope','$rootScope','$log','fitfire'];

	function MainCtrl($scope,$rootScope,$log,fitfire){

			var vm = this; //чтобы не путаться в областях видимости

			$rootScope.curPath = 'main';//что-то вроде глобальной переменной для использования во вьюхах

			vm.title = "Это Главная";
			vm.name = "Yan";
			vm.users = fitfire;
			
			$scope.clickFunction = function(name){
				alert('Hi,'+ name);
			}
	}

	configMain.$inject = ['$routeProvider'];

	function configMain($routeProvider){
		$routeProvider.
			when("/",{
				templateUrl: "app/main/main.html",
				controller: 'MainCtrl',
				controllerAs: 'vm'
			});
	}
})();
;(function(){
	'use strict';
	angular.module('ngFit.navbar',['ngRoute']);
})();

