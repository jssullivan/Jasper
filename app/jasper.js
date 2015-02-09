var jasper = angular.module('jasper', ['ngRoute', 'ui.router']);

jasper.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
	 $urlRouterProvider.otherwise("");

	$stateProvider
		.state('index', {
			url: "",
			templateUrl : 'routes/login.html',
			controller  : 'loginController'
		})
		.state('manage', {
			url: "manage",
			templateUrl : 'routes/manage.html',
			controller  : 'manageController'
		})
	    .state('manage.dashboard', {
	      url: "/dash",
	      templateUrl: "routes/internal/dashboard.html"
	    })
	    .state('manage.builds', {
	      url: "/builds",
	      templateUrl: "routes/internal/builds.html",
	      controller : 'buildsController'
	    })
	    .state('manage.todos', {
	      url: "/todos",
	      templateUrl: "routes/internal/todos.html"
	    })
	    .state('manage.issues', {
	      url: "/issues",
	      templateUrl: "routes/internal/issues.html",
	      controller: "issuesController"
	    });
		
		$locationProvider.html5Mode(true);
}]);