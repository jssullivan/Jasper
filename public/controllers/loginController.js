jasper.controller('loginController',['$scope', '$location', '$timeout', '$http', function($scope, $location, $timeout, $http) {
	$scope.loginForm = {};
	$scope.loginButton = "Login";

	//Attempt to login with the given credentials
	$scope.login = function() {
		$http({
		 	method  : 'POST',
			url     : '/login',
			data    : $.param($scope.loginForm),
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		 })
		.success(function(resp) {
			if (angular.fromJson(resp).loginStatus == "success") {
				//Redirect to the dashboard
				$location.path("/dash");
			} else {
				//Report the error logging in
				$scope.loginButton = "Login Failed!";
				$timeout(function() {
					$scope.loginButton = "Login";
					$scope.$apply();
				}, 3000);
			}
		});
	};
}]);