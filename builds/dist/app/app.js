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
				'ngFit.contact',
				'ngFit.navbar',
				'youtube-embed'
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
			this.isUser = function(name){
				console.log(users_arr[0]);
			};
			this.getUsers = function(cb){
				return users_arr.$loaded(cb);
			};
			this.getExercises = function(cb){
				return exercises_arr.$loaded(cb);
			};
			db_obj.$loaded(function(){
				vm.db_obj = db_obj;					
			});
			this.addUser = function(_user){
				users_obj.push(_user);
			};
			this.addExercise = function(_exercise){
				_exercise.added = $rootScope.name;
				exercises_obj.push(_exercise);
			};
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
	"use strict";
	/*angular
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
		*/
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
			$rootScope.login = false;
			var vm = this; //чтобы не путаться в областях видимости

			fitfire.getUsers(function(_d){
				vm.users = _d;
			});
			fitfire.getExercises(function(_d){
				vm.exercises = _d;
			});
			vm.user = {
				name : null,
				age : 0
			};
			vm.exercise = {
				full_name: null
			}
			var currentUser = fitfire.db.getAuth();
			console.log(currentUser);
			vm.addUser = function(){
				fitfire.addUser(vm.user);
			};
			vm.addExercise = function(){
				if ($rootScope.login){
					vm.author = $rootScope.name;
					fitfire.addExercise(vm.exercise);
				}
			};
			$rootScope.curPath = 'main';//что-то вроде глобальной переменной для использования во вьюхах

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

