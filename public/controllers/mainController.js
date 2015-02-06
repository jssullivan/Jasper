jasper.controller('mainController',['$scope', '$location', '$timeout', '$http', function($scope, $location, $timeout, $http) {

	//Redirect authenticated users
	$http({
	 	method  : 'GET',
		url     : '/authStatus',
		headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
	 })
	.success(function(resp) {
		if (angular.fromJson(resp).authStatus == "valid") {
			$location.path("/dash");
		} else {
			$location.path("/");
		}
	});
}]);