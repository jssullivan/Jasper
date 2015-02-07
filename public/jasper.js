var jasper = angular.module('jasper', ['ngRoute', 'ui.router']);

jasper.config(['$routeProvider','$locationProvider', '$stateProvider', '$urlRouterProvider', function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
	/*$routeProvider
		.when('/', {
			templateUrl : 'routes/login.html',
			controller  : 'loginController'
		})
		.when('/dash', {
			templateUrl : 'routes/dashboard.html',
			controller  : 'dashboardController'
		});*/
	$urlRouterProvider.otherwise("");

	$stateProvider
		.state('index', {
			url: "",
			templateUrl : 'routes/login.html',
			controller  : 'loginController'
		})
		.state('manage', {
			url: "manage",
			templateUrl : 'routes/dashboard.html',
			controller  : 'dashboardController'
		})
	    .state('manage.dashboard', {
	      url: "/dash",
	      templateUrl: "routes/internal/dashboard.html"
	    })
	    .state('manage.builds', {
	      url: "/builds",
	      templateUrl: "routes/internal/builds.html"
	    })
	    .state('manage.todos', {
	      url: "/todos",
	      templateUrl: "routes/internal/todos.html"
	    })
	    .state('manage.issues', {
	      url: "/issues",
	      templateUrl: "routes/internal/issues.html"
	    });
		
		$locationProvider.html5Mode(true);
}]);