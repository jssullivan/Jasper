var jasper = angular.module('jasper', ['ngRoute']);

jasper.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'routes/login.html',
			controller  : 'loginController'
		})
		.when('/dash', {
			templateUrl : 'routes/dashboard.html',
			controller  : 'dashboardController'
		});
		
		$locationProvider.html5Mode(true);
}]);