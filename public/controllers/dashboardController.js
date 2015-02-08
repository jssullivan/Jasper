jasper.controller('dashboardController',['$scope', '$state', '$http', function($scope, $state, $http) {
	var userInfo = null;
	$scope.name = "";

	//Call the resize function of the theme
	resize();

	//Open the Dashboard
	$state.go("manage.dashboard");

	//Get the current users info
	$http({
	 	method  : 'GET',
		url     : '/userInfo'
	 })
	.success(function(resp) {
		userInfo = angular.fromJson(resp);
		
		$scope.name = userInfo.name;
	});
}]);