jasper.controller('mainController',['$scope', '$state', '$http', function($scope, $state, $http) {

	//Redirect authenticated users
	$http({
	 	method  : 'GET',
		url     : '/authStatus'
	 })
	.success(function(resp) {
		if (angular.fromJson(resp).authStatus == "valid") {
			$state.go("manage");
		} else {
			$state.go("index");
		}
	});
}]);