jasper.controller('loginController',['$scope', '$state', '$http', '$timeout', function($scope, $state, $http, $timeout) {
	$scope.loginForm = {};
	$scope.loginButton = "Login";

	//Attempt to login with the given credentials
	$scope.login = function() {
		if ($scope.loginForm.username == "" || $scope.loginForm.password == "") {
			$timeout(function() {
				$scope.loginButton = "Login";
				$scope.$apply();
			}, 3000);
		} else {
			$http({
			 	method  : 'POST',
				url     : '/login',
				data    : $.param($scope.loginForm),
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
			})
			.success(function(resp) {
				if (angular.fromJson(resp).loginStatus == "success") {
					//Redirect to the dashboard
					$state.go("manage");
				} else {
					//Report the error logging in
					$scope.loginButton = "Login Failed!";
					$timeout(function() {
						$scope.loginButton = "Login";
						$scope.$apply();
					}, 3000);
				}
			});
		}
	};
}]);